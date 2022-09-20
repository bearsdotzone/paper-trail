<script context="module">
	import { onMount, onDestroy } from 'svelte';
	import { activeCards, activeCollection } from '$lib/stores';
</script>

<script>
	import List from '$lib/cardComponents/List.svelte';
	import { TabGroup, Tab } from '@brainandbones/skeleton';
	import { getCards } from '$lib/helpers';

	const getCollections = async () => {
		const req = await fetch(
			'http://localhost:5173/api/collections/readCollections?email=abney42%40gmail.com'
		);
		const res = await req.json();

		return res;
	};

	let unsubscribe = activeCollection.subscribe(async (activeCollection) => {
		if (activeCollection != '') {
			$activeCards = await getCards(activeCollection);
		}
	});

	let response = getCollections();
	onMount(async () => {
		$activeCollection = (await response)[0]['id'];
	});

	onDestroy(async () => {
		unsubscribe();
	});
</script>

<div class="min-h-screen bg-surface-800 text-neutral-100">
	{#await response}
		Loading...
	{:then query}
		<TabGroup
			selected={activeCollection}
			justify="justify-start"
			highlight="border-accent-500"
			color="text-accent-500"
		>
			{#each query as iCollection}
				<Tab value={iCollection['id']}>{iCollection['name']}</Tab>
			{/each}
		</TabGroup>
		{#each query as iCollection}
			{#if $activeCollection === iCollection['id'] && $activeCards != null}
				{#await $activeCards then card}
					{#each card as card}
						<List
							cardId={card['id']}
							cardName={card['name']}
							cardCount={card['nonfoil']}
						/>
					{/each}
				{/await}
			{/if}
		{/each}
	{/await}
</div>

<style>
</style>
