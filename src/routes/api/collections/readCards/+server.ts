import { error } from '@sveltejs/kit';
import prisma from '../../../../lib/db';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
	const collectionId = String(url.searchParams.get('collectionId') ?? '');

	const foundCollections = await prisma.collection.findUnique({
		where: { id: collectionId }
	});
	return new Response(JSON.stringify(foundCollections['cards']));
}
