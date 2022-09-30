import lucia from "lucia-sveltekit";
import prisma from "@lucia-sveltekit/adapter-prisma";
import { dev } from "$app/environment";
import { PrismaClient } from "@prisma/client";
import { LUCIA_SECRET } from "$env/static/private";

const client = new PrismaClient();

export const auth = lucia({
    adapter: prisma(client),
    secret: LUCIA_SECRET,
    env: dev ? "DEV" : "PROD",
});