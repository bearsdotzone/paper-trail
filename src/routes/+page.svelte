<script context="module">
	import { onMount } from 'svelte';
	import Tabs from '$lib/tabs/Tabs.svelte';
	import Tab from '$lib/tabs/Tab.svelte';
</script>

<script>
	/** @type {import('./$types').PageData} */
	export let data;
	const getCollections = async () => {
		const req = await fetch(
			'http://localhost:5173/api/collections/readCollections?email=abney42%40gmail.com'
		);
		const res = await req.json();

		data.collectionId = res[0]['id'];

		return res;
	};

	const getCards = async (id) => {
		const req = await fetch(
			'http://localhost:5173/api/collections/readCards?collectionId=' + id
		);
		const res = await req.json();
		data.workingCards = res;
		return res;
	};

	let response = getCollections();
	// onMount(async () => {
	// 	sessionStorage.setItem('collectionId', (await response)[0]['id']);
	// });
</script>

<Tabs>
	{#await response}
		Loading...
	{:then query}
		{#each query as iCollection}
			<Tab
				>{iCollection['name']}
				{#await getCards(iCollection['id']) then results}
					{#each results as card}
						<p>{card['name']} x{card['nonfoil']}</p>
					{/each}
				{/await}
				{#await getCards(iCollection['id']) then results}
					{#each data.workingCards as card}
						<p>live: {card['name']}</p>
					{/each}
				{/await}
			</Tab>
			<Tab
				><button
					on:click|preventDefault={() => {
						response = getCollections();
						{
							console.log(data.collectionId);
						}
					}}>refresh</button
				></Tab
			>
		{/each}
	{/await}
</Tabs>

<style>
</style>
