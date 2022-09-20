<script lang="ts">
	import '../app.postcss';
	import '@brainandbones/skeleton/styles/themes/theme-vintage.css';
	import { AppShell } from '@brainandbones/skeleton';
	import Sidebar from '$lib/sidebar/Sidebar.svelte';
</script>

<main>
	<AppShell>
		<svelte:fragment slot="header"
			><div class="text-xl text-center bg-primary-500">
				Paper Trail
			</div></svelte:fragment
		>
		<svelte:fragment slot="sidebarLeft"
			><div class="text-md bg-accent-500 min-h-full ">
				<Sidebar />
			</div></svelte:fragment
		>
		<!-- <svelte:fragment slot="sidebarRight">Sidebar Right</svelte:fragment> -->
		<!-- <svelte:fragment slot="pageHeader">Page Header</svelte:fragment> -->
		<svelte:fragment slot="pageFooter"
			><div
				class="text-lg absolute bottom-0 min-w-full text-center bg-primary-300"
			>
				Bears Loves Alexandra
			</div>
		</svelte:fragment>
		<!-- Be sure to insert your route <slot> in the default position --->
		<slot />
	</AppShell>
</main>
