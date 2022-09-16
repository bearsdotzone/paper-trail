// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	interface Locals {
		userid: string;
	}

	interface PageData {
		collectionId: string;
		bears: string;
		workingCards: {}[]
	}

	// interface PageError {}

	// interface Platform {}
}
