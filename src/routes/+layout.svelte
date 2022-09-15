<script lang="ts">
	import '../app.css';
	import Header from '$lib/header/Header.svelte';
	import Footer from '$lib/footer/Footer.svelte';
	import Sidebar from '$lib/sidebar/Sidebar.svelte';
</script>

<main>
	<Header />
	<div class="content">
		<Sidebar />
		<slot />
	</div>
	<Footer />
</main>
