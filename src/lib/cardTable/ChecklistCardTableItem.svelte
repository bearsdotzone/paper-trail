<script>
	import { onMount } from 'svelte';
	import { activeCards, activeCollection } from '$lib/stores';
	import { writable } from 'svelte/store';
	import { onDestroy } from 'svelte';

	export let cardData;
	export let index = 0;

	let columnData = [];
	let columns = ['name', 'nonfoil'];

	let count = writable(cardData['nonfoil']);

	// this accounts for getting your current value updated from the server.
	$: $count = cardData['nonfoil'];

	// encountered a race condition when rapidly changing the value of a
	// count, therefore this pseudo mutex exists.
	// to research: could there be an edge case where your last click is ignored
	// and your value ends up one lower than expected?
	let lock = false;
	let countUnsub = count.subscribe(async (count) => {
		if (lock) {
			return;
		}
		lock = true;

		cardData['nonfoil'] = count;

		//TODO: This boilerplate could probably be made into a helper
		const params = new URLSearchParams({
			collectionId: $activeCollection,
			cardData: JSON.stringify(cardData)
		});

		const request = new Request(
			'/api/collections/updateCards?' + params.toString(),
			{ method: 'PATCH' }
		);

		const response = await fetch(request);

		if (response.status == 200) {
			$activeCards = (await response.json())['cards'];
		}

		lock = false;
	});

	let bgcolor;
	onMount(async () => {
		bgcolor = index % 2 == 0 ? 'bg-surface-700 ' : 'bg-surface-600 ';

		// put card info into columnData

		const params = new URLSearchParams({
			cardId: cardData['id']
		});

		const request = new Request('/api/cards/fromId?' + params.toString(), {
			method: 'GET'
		});

		const response = await fetch(request);

		if (response.status == 200) {
			columnData = await response.json();
			console.log(columnData);
		}
	});

	onDestroy(() => {
		countUnsub();
	});
</script>

<tr class={bgcolor}>
	<td>{cardData['name']}</td>
	<td class="text-neutral-800">
		<input type="number" bind:value={$count} min="0" /></td>
	{#if 'set' in columns}
		<td>{columnData['set']}</td>
	{/if}
</tr>

<style>
</style>
