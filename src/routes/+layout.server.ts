// +layout.server.ts
import { auth } from "$lib/lucia";

export const load = auth.handleServerSession();