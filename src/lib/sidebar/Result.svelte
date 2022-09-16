<script>
	export let cardData;
	// export let resultType = 'Text';

	async function removeCard() {
		const response = await fetch(
			'/api/collections/removeCards?collectionId=' +
				sessionStorage.getItem('collectionId') +
				'&cardId=' +
				cardData['id']
		);
	}
	async function addCard() {
		const params = new URLSearchParams({
			collectionId: sessionStorage.getItem('collectionId'),
			cardId: cardData['id']
		});

		const request = new Request(
			'/api/collections/addCards?' + params.toString(),
			{ method: 'PATCH' }
		);

		const response = await fetch(request);
	}
</script>

<div class="result">
	<button on:click={() => removeCard()}>-</button>
	{cardData['name']}
	<button on:click={() => addCard()}>+</button>
</div>
