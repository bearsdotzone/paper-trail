<script>
	const getCollections = async () => {
		const req = await fetch('/api/collections/readCollections?email=abney42%40gmail.com');
		const res = await req.json();

		return res;
	};

	const response = getCollections();
</script>

<div>
	{#await response}
		Loading...
	{:then query}
		{#each query as iCollection}
			<p>{iCollection['name']}</p>
		{/each}
	{/await}
</div>

<!-- {/await} -->
<style>
</style>
