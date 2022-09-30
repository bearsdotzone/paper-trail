import { activeCollection, activeCards } from '$lib/stores';
export async function updateCard(cardData) {
	let readStore;
	activeCollection.subscribe((activeCollection) => { readStore = activeCollection })()
	const params = new URLSearchParams({
		collectionId: readStore,
		cardData: JSON.stringify(cardData)
	});

	const request = new Request(
		'/api/collections/updateCards?' + params.toString(),
		{ method: 'PATCH' }
	);

	const response = await fetch(request);

	if (response.status == 200) {
		activeCards.set((await response.json())['cards']);
	}
}
