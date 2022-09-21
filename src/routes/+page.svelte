<script context="module" lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { activeCards, activeCollection } from '$lib/stores';
</script>

<script lang="ts">
	import { TabGroup, Tab, DataTable } from '@brainandbones/skeleton';
	import { getCards, getCollections } from '$lib/helpers';
	import { derived } from 'svelte/store';

	let unsubscribe = activeCollection.subscribe(async (activeCollection) => {
		if (activeCollection != '') {
			$activeCards = await getCards(activeCollection);
		}
	});

	const headings = ['Name', 'Count'];
	let testContent = derived(activeCards, ($activeCards) => {
		let mappedCards = [];
		$activeCards.forEach((element) => {
			mappedCards = mappedCards.concat({
				name: element['name'],
				count: element['nonfoil']
			});
		});
		return mappedCards;
	});

	let response = getCollections();
	onMount(async () => {
		$activeCollection = (await response)[0]['id'];
	});

	onDestroy(async () => {
		unsubscribe();
	});
</script>

<div class="min-h-screen bg-surface-800 text-neutral-100 p-1">
	{#await response}
		Loading...
	{:then query}
		<TabGroup
			selected={activeCollection}
			justify="justify-start"
			highlight="border-accent-500"
			color="text-accent-500">
			{#each query as iCollection}
				<Tab value={iCollection['id']}>{iCollection['name']}</Tab>
			{/each}
		</TabGroup>
		{#each query as iCollection}
			{#if $activeCollection === iCollection['id']}
				<DataTable {headings} source={$testContent} />
			{/if}
		{/each}
	{/await}
</div>

<style>
</style>
