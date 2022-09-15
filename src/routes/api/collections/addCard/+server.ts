import { error } from '@sveltejs/kit';
import prisma from '../../../../lib/db'

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
    const cardToAdd = String(url.searchParams.get('cardId') ?? '');
    const collectionToUpdate = String(url.searchParams.get('collectionId') ?? '')

    const currentCards = (await prisma.collection.findUnique({ where: { id: collectionToUpdate } }))['cards']

    const foundCollections = await prisma.collection.update({ where: { id: collectionToUpdate }, data: { cards: currentCards.concat(cardToAdd) } })
    // console.log(foundCollections)
    return new Response(JSON.stringify(foundCollections));
}