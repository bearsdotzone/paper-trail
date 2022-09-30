import { error, json } from '@sveltejs/kit';
import prisma from '$lib/db';
import { element } from 'svelte/internal';

/** @type {import('./$types').RequestHandler} */
export async function PATCH({ url }) {
	//ublock origin was causing some trouble with the api receiving both the
	// card Id and the collection Id, perhaps it's interpreting these as tracking
	// tags? if so, how to resolve?
	const cardData = JSON.parse(url.searchParams.get('cardData') ?? '');
	const collectionToUpdate: string = String(
		url.searchParams.get('collectionId') ?? ''
	);

	if (cardData == '' || collectionToUpdate == '') {
		return new Response(null, { status: 204 });
	}

	const currentCards = (
		await prisma.collection.findUnique({ where: { id: collectionToUpdate } })
	)['cards'];

	const indexInArray = currentCards.findIndex((element) => {
		return element['id'] == cardData['id'];
	});

	const cardExistsInArray = indexInArray != -1;

	if (cardExistsInArray) {
		// var toChange = currentCards[indexInArray];
		// toChange['nonfoil'] = cardData['nonfoil'];
		currentCards[indexInArray] = cardData;

		if (cardData['nonfoil'] <= 0) {
			currentCards.splice(indexInArray, 1);
		}

		const updateResult = await prisma.collection.update({
			where: { id: collectionToUpdate },
			data: { cards: currentCards }
		});
		return new Response(JSON.stringify(updateResult), { status: 200 });
	}
	return new Response(null, { status: 204 });
}
