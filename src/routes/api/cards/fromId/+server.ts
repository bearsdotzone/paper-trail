import redis from 'redis';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
	const cardId = String(url.searchParams.get('cardId') ?? '');

	const client = await redis.createClient({});
	await client.connect();

	const cardData = await client.json.GET(cardId);

	await client.quit();

	return new Response(JSON.stringify(cardData));
}
