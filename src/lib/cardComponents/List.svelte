<script>
	import { activeCards, activeCollection } from '$lib/stores';
	export let cardName;
	export let cardCount;
	export let cardId;

	async function removeCard() {
		const params = new URLSearchParams({
			collectionId: $activeCollection,
			cardId: cardId
		});

		const request = new Request(
			'/api/collections/removeCards?' + params.toString(),
			{ method: 'PATCH' }
		);

		const response = await fetch(request);

		if (response.status == 200) {
			$activeCards = (await response.json())['cards'];
		}
	}

	async function addCard() {
		const params = new URLSearchParams({
			collectionId: $activeCollection,
			cardId: cardId
		});

		const request = new Request(
			'/api/collections/addCards?' + params.toString(),
			{ method: 'PATCH' }
		);

		const response = await fetch(request);

		if (response.status == 200) {
			$activeCards = (await response.json())['cards'];
		}
	}
</script>

<tr class="list">
	<td>{cardName}</td>
	<td>{cardCount}</td>
	<td
		><button
			on:click={() => {
				removeCard();
			}}>-</button
		></td
	>
	<td
		><button
			on:click={() => {
				addCard();
			}}>+</button
		></td
	>
</tr>

<style>
	.list {
	}
</style>
