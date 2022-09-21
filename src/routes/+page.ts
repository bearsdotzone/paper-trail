/** @type {import('./$types').PageLoad} */
export function load({ data }) {
	return {
		collectionId: 'bears',
		bears: 'bears',
		workingCards: []
	};
}
