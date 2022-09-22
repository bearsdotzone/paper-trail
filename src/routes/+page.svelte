<script context="module" lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { activeCollection } from '$lib/stores';
</script>

<script lang="ts">
	import { TabGroup, Tab } from '@brainandbones/skeleton';
	import { getCards, getCollections } from '$lib/helpers';
	import { activeCards } from '$lib/stores';
	import ChecklistCardTable from '$lib/cardTable/ChecklistCardTable.svelte';
	import ChecklistCardTableItem from '$lib/cardTable/ChecklistCardTableItem.svelte';

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

<div class="min-h-80 bg-surface-800 text-neutral-100 p-1">
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
		{#key activeCards}
			<ChecklistCardTable name count cards={$activeCards} />
		{/key}
	{/await}
</div>

<style>
</style>
