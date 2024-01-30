<script lang="ts">
	import { activeCards, activeCollection } from '$lib/stores';
	import { onMount } from 'svelte';

	export let cardData;
	export let index;

	// export let resultType = 'Text';

	let files: FileList;

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
		><button  on:click={() => removeCard()} 
			>-</button>
	</td><td class="items-center">
		<button   on:click={() => addCard()} 
			>+</button> 
	</td>
</tr>
