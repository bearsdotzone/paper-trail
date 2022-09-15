<script>
	export let cardData;
	export let resultType = 'Text';
</script>

<div class="result">
	{#if resultType == 'Image'}
		{#if cardData['image_uris']}
			<img src={cardData['image_uris']['small']} alt="bears" />
		{:else}
			<img
				src={cardData['card_faces']['0']['image_uris']['small']}
				alt="bears"
			/>
		{/if}
	{:else}
		<p>{cardData['name']}</p>
	{/if}
</div>
