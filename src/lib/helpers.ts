export function addCard(
	array,
	cardId: string,
	cardName: string,
	quantity: number
) {
	const index = array.findIndex((x) => {
		x['id'] == cardId;
	});

	const existsInArray = index != -1;

	if (existsInArray) {
		// var existingElement = array[index];
		// existingElement['nonfoil'] += 1
		// array[index] = existingElement

		array[index]['nonfoil'] += quantity;

		return array;
	} else {
		return array.push(newCard(cardId, cardName));
	}
}

export function newCard(id: string, name: string) {
	return { id: id, name: name, nonfoil: 0, foil: 0, glossy: 0, etched: 0 };
}

export const getCards = async (id) => {
	const req = await fetch(
		'http://localhost:5173/api/collections/readCards?collectionId=' + id
	);
	const res = await req.json();

	return res;
};

export const getCollections = async (id?) => {
	const req = await fetch(
		'http://localhost:5173/api/collections/readCollections?email=abney42%40gmail.com'
	);
	const res = await req.json();

	return res;
};