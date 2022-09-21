<script lang="ts">
	import { activeCards, activeCollection } from '$lib/stores';
	import { Button } from '@brainandbones/skeleton';
	import { onMount } from 'svelte';

	export let cardData;
	export let index;

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
	let bgcolor;
	onMount(() => {
		bgcolor = index % 2 == 0 ? 'bg-surface-700' : 'bg-surface-600';
	});
</script>

<tr class={bgcolor + ' p-1'}>
	<td>
		<div class="text-neutral-100">{cardData['name']}</div>
	</td><td class="items-center"
		><Button background="bg-primary-200" size="sm" on:click={() => removeCard()}
			>-</Button>
	</td><td class="items-center">
		<Button background="bg-accent-200" size="sm" on:click={() => addCard()}
			>+</Button>
	</td>
</tr>
