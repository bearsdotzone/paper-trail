<script lang="ts">
	import '../app.postcss';
	import '@brainandbones/skeleton/themes/theme-vintage.css';
	import { AppShell } from '@brainandbones/skeleton';
	import Sidebar from '$lib/sidebar/Sidebar.svelte';
	import { LightSwitch } from '@brainandbones/skeleton';

	// import { handleSilentRefresh } from 'lucia-sveltekit/client';
	import { dev } from '$app/environment';
	import { PUBLIC_GITHUB_ID } from '$env/static/public';

	// handleSilentRefresh();

	const githubClientId = dev ? PUBLIC_GITHUB_ID : 'PROD_GITHUB_CLIENT_ID';
	const githubLink = `https://github.com/login/oauth/authorize?client_id=${githubClientId}&scope=user:email`;

	import { signOut } from 'lucia-sveltekit/client';

	const signOutUser = async () => {
		try {
			await signOut('/');
		} catch {
			// handle error
		}
	};
	import { getUser } from 'lucia-sveltekit/client';
	import { onMount } from 'svelte';

	let session;

	let files: FileList;

	onMount(() => {
		session = getUser();
	});
</script>

<main class="bg-surface-800">
	<AppShell>
		<svelte:fragment slot="header">
			<div class="h-10 bg-primary-500 text-xl text-center p-1">
				<div class="float-left">
					<!-- {#if $session}
						<button on:click={signOutUser} class="p-1"
							>Sign Out</button>
					{:else}
						<button on:click={() => alert('clicked')} class="github p-1" >
							Login with Github
						</button>
					{/if} -->
				</div>
				Paper Trail
				<div class="float-right">
					<LightSwitch />
				</div>
			</div>
		</svelte:fragment>
		<svelte:fragment slot="sidebarLeft"
			><div class="text-md bg-surface-700 min-h-full p-1">
				<Sidebar />
			</div></svelte:fragment>
		<!-- <svelte:fragment slot="sidebarRight">Sidebar Right</svelte:fragment> -->
		<!-- <svelte:fragment slot="pageHeader">Page Header</svelte:fragment> -->
		<svelte:fragment slot="pageFooter"
			><div class="text-lg bottom-0 sticky text-center bg-primary-300 p-1">
				test
			</div>
		</svelte:fragment>
		<!-- Be sure to insert your route <slot> in the default position --->
		<slot />
	</AppShell>
</main>
