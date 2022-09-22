import { error, json } from '@sveltejs/kit';
import prisma from '$lib/db';
import { element } from 'svelte/internal';

/** @type {import('./$types').RequestHandler} */
export async function PATCH({ url }) {
	//ublock origin was causing some trouble with the api receiving both the
	// card Id and the collection Id, perhaps it's interpreting these as tracking
	// tags? if so, how to resolve?
	const cardToRemove = String(url.searchParams.get('cardId') ?? '');
	const collectionToUpdate = String(url.searchParams.get('collectionId') ?? '');

	const cardDataReq = await fetch(
		'http://127.0.0.1:5173/api/cards/fromId?cardId=' + cardToRemove
	);
	const cardDataRes = await cardDataReq.json();

	if (cardToRemove == '' || collectionToUpdate == '') {
		return new Response(null, { status: 204 });
	}

	const currentCards = (
		await prisma.collection.findUnique({ where: { id: collectionToUpdate } })
	)['cards'];

	const indexInArray = currentCards.findIndex((element) => {
		return element['id'] == cardToRemove;
	});

	const cardExistsInArray = indexInArray != -1;

	if (cardExistsInArray) {
		const toChange = currentCards[indexInArray];
		toChange['nonfoil'] -= 1;
		currentCards[indexInArray] = toChange;
		if (toChange['nonfoil'] <= 0) {
			currentCards.splice(indexInArray, 1);
		}
		const updateResult = await prisma.collection.update({
			where: { id: collectionToUpdate },
			data: { cards: currentCards }
		});
		return new Response(JSON.stringify(updateResult), { status: 200 });
	} else {
		return new Response(null, { status: 204 });
	}
}
