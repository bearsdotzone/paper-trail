// src/app.d.ts
declare global {
	namespace App {
		interface Locals {
			auth: import("lucia").AuthRequest;
		}
	}
}

/// <reference types="lucia" />
declare global {
	namespace Lucia {
		type Auth = import("$lib/server/lucia").Auth;
		type UserAttributes = {};
	}
}

// THIS IS IMPORTANT!!!
export {};