<script>
	import { invalidate, invalidateAll } from '$app/navigation';
	import { activeCards, activeCollection } from '$lib/stores';

	export let cardData;
	// export let resultType = 'Text';

	async function removeCard() {
		const params = new URLSearchParams({
			collectionId: $activeCollection,
			cardId: cardData['id']
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
			cardId: cardData['id']
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

<div class="result">
	<button on:click={() => removeCard()}>-</button>
	{cardData['name']}
	<button on:click={() => addCard()}>+</button>
</div>
