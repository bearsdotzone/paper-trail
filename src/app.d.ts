// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	interface Locals {
		userid: string;
	}

	interface PageData { }

	// interface PageError {}

	// interface Platform {}
}

import type { User } from "@prisma/client";

declare namespace Lucia {
	interface UserData extends Omit<User, "id" | "identifier_token" | "hashed_password"> { }
}
