<script lang="ts">
	import { onMount } from 'svelte';
	import { readable, writable } from 'svelte/store';
	import { onDestroy } from 'svelte';
	import ChecklistCardTableItem from './ChecklistCardTableItem.svelte';

	export let cards = [];
	export let name = false;
	export let count = false;
	export let set = false;

	let sortKey = 'name';
	let sortReversed = false;

	function setSort(input: string) {
		if (sortKey == input) {
			sortReversed = !sortReversed;
		} else {
			sortKey = input;
			sortReversed = false;
		}
	}

	$: sorted = [...cards]
		.sort((a, b) => {
			// Don't know how to sort by this key.
			if (a[sortKey] == undefined) {
				return 0;
			}

			if (a[sortKey] == b[sortKey]) return 0;
			if (sortReversed) {
				if (a[sortKey] < b[sortKey]) return 1;
				if (a[sortKey] > b[sortKey]) return -1;
			} else {
				if (a[sortKey] < b[sortKey]) return -1;
				if (a[sortKey] > b[sortKey]) return 1;
			}
		})
		.slice(pageIndex * Number(pageSize), (1 + pageIndex) * Number(pageSize));

	let pageSize = '25';
	$: pageCount = Math.max(Math.ceil(cards.length / Number(pageSize)), 1);
	let pageIndex = 0;
	$: pageIndex = Math.min(pageIndex, pageCount - 1);

	// ironically page counts also need to be sliced.
</script>

<table class="p-1 w-full">
	<thead class="bg-surface-900">
		<tr>
			<!-- Maybe this could be refactored into an array of strings -->
			{#if name}
				<td on:click={() => setSort('name')}>Name</td>
			{/if}
			{#if count}
				<td on:click={() => setSort('nonfoil')}>Count</td>
			{/if}
			{#if set}
				<td on:click={() => setSort('set')}>Set</td>
			{/if}
		</tr>
	</thead>
	<tbody>
		{#each sorted as card, index}
			<ChecklistCardTableItem cardData={card} {index} />
		{/each}
	</tbody>
</table>
<div class="p-1 text-neutral-800 w-full text-center">
	<select id="simple" name="simple" bind:value={pageSize} class="float-left">
		<option selected>25</option>
		<option>50</option>
	</select>

	<span class="text-neutral-100 text-center">
		{#each Array(pageCount) as _, index (index)}
			<span on:click={() => (pageIndex = index)}>{index + 1}{' '}</span>
		{/each}
	</span>
</div>
