import redis from 'redis'

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
    const client = redis.createClient({});
    await client.connect();

    const query = String(url.searchParams.get('q') ?? '')

    const query_results = await client.ft.search('idx:cards', query + '@set_type:expansion', { VERBATIM: true })

    await client.quit()
    if (query_results.total == 0) {
        return new Response(null, { status: 204 })
    }

    //error - [ErrorReply: LOADING Redis is loading the dataset in memory] { page: '/api/search'}

    var query_values = []
    query_results['documents'].forEach(element => {
        query_values.push(element['value'])
    });

    return new Response(JSON.stringify(query_values), { status: 200 })

}