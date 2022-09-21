<script>
	import List from '$lib/cardComponents/List.svelte';
	import Result from './Result.svelte';
	var searchField = '@set:dmu';
	var results = [];
	var resultType;

	async function onSubmit(e) {
		const searchReq = await fetch('/api/search?q=' + searchField);
		const status = await searchReq.status;
		if (status == 200) results = await searchReq.json();
		else results = [];
	}
</script>

<form on:submit|preventDefault={onSubmit}>
	<input type="search" bind:value={searchField} />
	<select id="simple" name="simple" bind:value={resultType}>
		<option selected>Text</option>
		<option>Image</option>
	</select>
</form>
<!-- {#await results then query}
	{#if results.length == 0}
		<p>no results</p>
	{:else}
		{#each query as iCollection}
			<Result cardData={iCollection} />
		{/each}
	{/if}
{/await} -->
<table>
	{#await results then query}
		{#if results.length == 0}
			<p>no results</p>
		{:else}
			{#each query as iCollection}
				<List cardData={iCollection} />
			{/each}
		{/if}
	{/await}
</table>
