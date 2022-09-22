<script>
	import { onMount } from 'svelte';

	export let cardData;
	export let index = 0;

	let bgcolor;
	onMount(() => {
		bgcolor = index % 2 == 0 ? 'bg-surface-700 ' : 'bg-surface-600 ';
	});
</script>

<tr class={bgcolor}>
	<td>{cardData['name']}</td>
	<td>{cardData['nonfoil']}</td>
</tr>

<style>
</style>
