import prisma from '../../../../lib/db'

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
  const email = String(url.searchParams.get('email') ?? 'na');

  const foundCollections = await prisma.collection.findMany({
    where: { user: { email: email } }, select: {
      id: true,
      name: true
    }
  })

  return new Response(JSON.stringify(foundCollections));
}