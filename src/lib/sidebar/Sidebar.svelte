<script lang="ts">
	import Result from './Result.svelte';
	import { onMount } from 'svelte';

	let searchField = '@set:dmu';
	let results = [];
	let resultType;

	async function onSubmit(_e?) {
		const searchReq = await fetch('/api/search?q=' + searchField);
		const status = await searchReq.status;
		if (status == 200) results = await searchReq.json();
		else results = [];
	}

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

{#await results then result}
	{#if results.length == 0}
		<div class="text-neutral-100 bg-surface-800">
			No results for {searchField}
		</div>
	{:else}
		<table class="w-full bg-surface-800">
			<thead>
				<tr class="text-center text-neutral-100"
					><td>Name</td><td>-</td><td>+</td></tr>
			</thead>
			<tbody>
				{#each result as card, index}
					<Result cardData={card} {index} />
				{/each}
			</tbody>
		</table>
	{/if}
{/await}

<style>
	.sidebar input,
	select {
		border-radius: 3px;
	}
</style>
