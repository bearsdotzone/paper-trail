<script lang="ts">
	import { activeCards, activeCollection } from '$lib/stores';
	import { Button } from '@brainandbones/skeleton';

	export let cardData: [] = [];
	export let collectionData: [] = [];
	$: cardId = cardData['id'] ?? collectionData['id'];
	$: cardCount = collectionData['nonfoil'] ?? 0;
	$: cardName =
		cardData['name'] ?? cardData['printed_name'] ?? collectionData['name'];

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

<tr>
	<td><div class="text-neutral-100">{cardName}</div></td>
	<td>
		<Button
			background="bg-primary-300"
			on:click={() => {
				removeCard();
			}}>-</Button>
	</td>
	{#if collectionData.length != 0}
		<td><div class="text-center">{cardCount}</div></td>
	{/if}
	<td>
		<Button
			background="bg-accent-300"
			on:click={() => {
				addCard();
			}}>+</Button>
	</td>
</tr>
