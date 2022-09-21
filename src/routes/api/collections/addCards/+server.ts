import { error, json } from '@sveltejs/kit';
import prisma from '$lib/db';
import { element } from 'svelte/internal';

/** @type {import('./$types').RequestHandler} */
export async function PATCH({ url }) {
	//ublock origin was causing some trouble with the api receiving both the
	// card Id and the collection Id, perhaps it's interpreting these as tracking
	// tags? if so, how to resolve?
	const cardToAdd: string = String(url.searchParams.get('cardId') ?? '');
	const collectionToUpdate: string = String(
		url.searchParams.get('collectionId') ?? ''
	);

	const cardDataReq = await fetch(
		'http://127.0.0.1:5173/api/cards/fromId?cardId=' + cardToAdd
	);
	const cardDataRes = await cardDataReq.json();

	if (cardToAdd == '' || collectionToUpdate == '') {
		return new Response(null, { status: 204 });
	}

	const currentCards = (
		await prisma.collection.findUnique({ where: { id: collectionToUpdate } })
	)['cards'];

	const indexInArray = currentCards.findIndex((element) => {
		return element['id'] == cardToAdd;
	});

	const cardExistsInArray = indexInArray != -1;

	if (cardExistsInArray) {
		var toChange = currentCards[indexInArray];
		toChange['nonfoil'] += 1;
		currentCards[indexInArray] = toChange;
		const updateResult = await prisma.collection.update({
			where: { id: collectionToUpdate },
			data: { cards: currentCards }
		});
		return new Response(JSON.stringify(updateResult), { status: 200 });
	} else {
		// Feels hacky, should probably make a Type for this.
		var toAdd = JSON.parse('{}');
		toAdd['id'] = cardToAdd;
		toAdd['name'] = cardDataRes['name'] ?? cardDataRes['printed_name'];
		toAdd['nonfoil'] = 1;
		toAdd['foil'] = 0;
		toAdd['etched'] = 0;
		toAdd['glossy'] = 0;

		var newCards = currentCards.concat(toAdd);
		const updateResult = await prisma.collection.update({
			where: { id: collectionToUpdate },
			data: { cards: newCards }
		});
		return new Response(JSON.stringify(updateResult), { status: 200 });
	}
}
