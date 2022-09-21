<script lang="ts">
	import '../app.postcss';
	import '@brainandbones/skeleton/styles/themes/theme-vintage.css';
	import { AppShell } from '@brainandbones/skeleton';
	import Sidebar from '$lib/sidebar/Sidebar.svelte';
	import { LightSwitch } from '@brainandbones/skeleton';
</script>

<main>
	<AppShell>
		<svelte:fragment slot="header"
			><div class="text-xl text-center bg-primary-500 p-1">
				Paper Trail
				<!-- <LightSwitch /> -->
			</div>
		</svelte:fragment>
		<svelte:fragment slot="sidebarLeft"
			><div class="text-md bg-surface-700 min-h-full p-1">
				<Sidebar />
			</div></svelte:fragment>
		<!-- <svelte:fragment slot="sidebarRight">Sidebar Right</svelte:fragment> -->
		<!-- <svelte:fragment slot="pageHeader">Page Header</svelte:fragment> -->
		<svelte:fragment slot="pageFooter"
			><div class="text-lg sticky min-w-full text-center bg-primary-300 p-1">
				Bears Loves Alexandra
			</div>
		</svelte:fragment>
		<!-- Be sure to insert your route <slot> in the default position --->
		<slot />
	</AppShell>
</main>
