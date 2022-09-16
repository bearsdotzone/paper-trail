import { error } from '@sveltejs/kit';
import prisma from '../../../../lib/db'

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
    const cardToAdd = String(url.searchParams.get('cardId') ?? '');
    const collectionToUpdate = String(url.searchParams.get('collectionId') ?? '')

    var currentCards = (await prisma.collection.findUnique({ where: { id: collectionToUpdate } }))['cards']

    const index = currentCards.indexOf(cardToAdd)
    if (index != -1) {
        currentCards = currentCards.slice(0, index - 1).concat(currentCards.slice(index + 1, 0))
    }

    const foundCollections = await prisma.collection.update({ where: { id: collectionToUpdate }, data: { cards: currentCards } })

    return new Response(JSON.stringify(foundCollections));
}