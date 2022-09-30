<script lang="ts">
	import Result from './Result.svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	let searchField = '@set:dmu';
	let results = [];
	let resultType;
	let resultCount = 0;

	async function onSubmit(_e?) {
		const searchReq = await fetch('/api/search?q=' + searchField);
		const status = await searchReq.status;
		if (status == 200) {
			let newResults = [];
			let searchRes = await searchReq.json();
			searchRes['documents'].forEach((element) => {
				newResults.push(element['value']);
			});
			results = newResults;
			resultCount = results.length;
		} else {
			results = [];
			resultCount = 0;
		}
	}

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

	$: sorted = [...results]
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

	let pageSize = '10';
	$: pageCount = Math.max(Math.ceil(results.length / Number(pageSize)), 1);
	let pageIndex = 0;
	$: pageIndex = Math.min(pageIndex, pageCount - 1);

	onMount(() => {
		onSubmit();
	});
</script>

<div class="sidebar p-1">
	<form on:submit|preventDefault={onSubmit}>
		<input type="search" bind:value={searchField} />
		<select id="simple" name="simple" bind:value={resultType}>
			<option selected>Text</option>
			<option>Image</option>
		</select>
	</form>
</div>

{#key results}
	{#if results.length == 0}
		<div class="text-neutral-100 bg-surface-800">
			No results for {searchField}
		</div>
	{:else}
		<table class="w-full bg-surface-800">
			<thead>
				<tr class="text-center text-neutral-100">
					<td on:click={() => setSort('name')}>Name</td>
					<td>-</td>
					<td>+</td>
				</tr>
			</thead>
			<tbody>
				{#each sorted as card, index}
					<Result cardData={card} {index} />
				{/each}
			</tbody>
		</table>
	{/if}
{/key}
<div class="p-1 text-neutral-800 w-full text-center">
	<select id="simple" name="simple" bind:value={pageSize} class="float-left">
		<option selected>10</option>
		<option>20</option>
	</select>

	<span class="text-neutral-100 text-center">
		{#if pageCount <= 10}
			{#each Array(pageCount) as _, index (index)}
				<span on:click={() => (pageIndex = index)}>{index + 1}{' '}</span>
			{/each}
		{:else if pageIndex < 3}
			{#each Array(5) as _, index}
				<span on:click={() => (pageIndex = index)}>{index + 1}{' '}</span>
			{/each}
			{'...'}
			<span on:click={() => (pageIndex = pageCount - 1)}>{pageCount}{' '}</span>
		{:else if pageCount - pageIndex < 4}
			<span on:click={() => (pageIndex = 0)}>{0 + 1}{' '}</span>
			{'...'}
			{#each Array(5) as _, index}
				<span on:click={() => (pageIndex = pageCount - (5 - index))}
					>{pageCount - (5 - index) + 1}{' '}</span>
			{/each}
		{:else}
			<span on:click={() => (pageIndex = 0)}>{0 + 1}{' '}</span>
			{'...'}
			{#each Array(5) as _, index (index)}
				{@const actualIndex = pageIndex - 2 + index}
				<span on:click={() => (pageIndex = actualIndex)}
					>{actualIndex + 1}{' '}</span>
			{/each}
			{'...'}
			<span on:click={() => (pageIndex = pageCount - 1)}>{pageCount}{' '}</span>
		{/if}
	</span>
</div>

<style>
	.sidebar input,
	select {
		border-radius: 3px;
	}
</style>
