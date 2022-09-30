import prisma from '$lib/db';
import { auth } from '$lib/lucia';

/** @type {import('./$types').RequestHandler} */
export async function GET({ request }) {
	try {
		// authenticated
		const user = await auth.validateRequest(request);
		const foundCollections = await prisma.collection.findMany({
			where: { user: { email: user.user.email } },
			select: {
				id: true,
				name: true
			}
		});

		return new Response(JSON.stringify(foundCollections));
	} catch {
		// not authenticated
		return new Response(null, { status: 401 })
	}
}
