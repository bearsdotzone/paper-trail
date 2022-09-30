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

	import { getSession } from 'lucia-sveltekit/client';

	let session = getSession();

	let response = getCollections(
		$session != null ? $session.access_token : null
	);

	onMount(async () => {
		$activeCollection = (await response)[0]['id'];
	});

	onDestroy(async () => {
		unsubscribe();
	});
</script>

<div class="min-h-80 bg-surface-800 text-neutral-100 p-1">
	{#await session}
		<p>Loading...</p>
	{:then}
		{#if $session}
			{#await response then query}
				{#key response}
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
				{/key}
			{/await}
		{:else}
			<p>login to continue</p>
		{/if}
	{/await}
</div>

<style>
</style>
