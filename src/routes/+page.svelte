<script context="module">
	import { onMount } from 'svelte';
	import Tabs from '$lib/tabs/Tabs.svelte';
	import Tab from '$lib/tabs/Tab.svelte';
	import { activeCards, activeCollection } from '$lib/stores';
</script>

<script>
	const getCollections = async () => {
		const req = await fetch(
			'http://localhost:5173/api/collections/readCollections?email=abney42%40gmail.com'
		);
		const res = await req.json();

		return res;
	};

	const getCards = async (id) => {
		const req = await fetch(
			'http://localhost:5173/api/collections/readCards?collectionId=' + id
		);
		const res = await req.json();

		return res;
	};

	let response = getCollections();
	onMount(async () => {
		$activeCollection = (await response)[0]['id'];
		$activeCards = await getCards($activeCollection);
	});
</script>

<Tabs>
	{#await response}
		Loading...
	{:then query}
		{#each query as iCollection}
			<Tab
				>{iCollection['name']}
				{#each $activeCards as card}
					<p>{card['name']} x{card['nonfoil']}</p>
				{/each}
			</Tab>
		{/each}
	{/await}
</Tabs>

<style>
</style>
