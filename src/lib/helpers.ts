export function addCard(array, cardId: string, cardName: string, quantity: number) {

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
    }
    else {
        return array.push(newCard(cardId, cardName))
    }
}

export function newCard(id: string, name: string) {
    return { 'id': id, 'name': name, 'nonfoil': 0, 'foil': 0, 'glossy': 0, 'etched': 0 }
}