import { dev } from "$app/environment"; // dev === true if in development
import { GITHUB_SECRET } from "$env/static/private";
import { PUBLIC_GITHUB_ID } from "$env/static/public";

import { auth } from "$lib/lucia.js"; // Lucia instance
import type { RequestHandler } from "@sveltejs/kit";

const clientId = dev ? PUBLIC_GITHUB_ID : "PROD_GITHUB_CLIENT_ID";
const clientSecret = dev
    ? GITHUB_SECRET
    : "PROD_GITHUB_CLIENT_SECRET";

export const GET: RequestHandler = async ({ url }) => {
    const code = url.searchParams.get("code");
    if (!code) {
        return new Response(
            JSON.stringify({
                message: "Invalid request url parameters.",
            }),
            {
                status: 400,
            }
        );
    }
    const getAccessTokenResponse = await fetch(
        `https://github.com/login/oauth/access_token?client_id=${clientId}&client_secret=${clientSecret}&code=${code}`,
        {
            method: "POST",
            headers: {
                Accept: "application/json",
            },
        }
    );
    if (!getAccessTokenResponse.ok) {
        return new Response(
            JSON.stringify({
                message: "Failed to fetch data from Github",
            }),
            {
                status: 500,
            }
        );
    }
    const getAccessToken = await getAccessTokenResponse.json();
    const accessToken = getAccessToken.access_token;

    const getUserEmailsResponse = await fetch(
        "https://api.github.com/user/emails",
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );
    if (!getUserEmailsResponse.ok) {
        return new Response(
            JSON.stringify({
                message: "Failed to fetch data from Github",
            }),
            {
                status: 500,
            }
        );
    }
    const emails = (await getUserEmailsResponse.json()) as {
        email: string;
        primary: boolean;
    }[];
    const email = emails.find((val) => val.primary)?.email || emails[0].email;

    const user = await auth.getUser("github", email);

    if (user) {
        try {
            const authenticateUser = await auth.authenticateUser(
                "github",
                email
            );
            return new Response(null, {
                status: 302,
                headers: {
                    "set-cookie": authenticateUser.cookies.join(),
                    location: "/",
                },
            });
        } catch {
            // Cannot connect to database
            return new Response(
                JSON.stringify({
                    message: "An unknown error occurred",
                }),
                {
                    status: 500,
                }
            );
        }
    }
    try {
        const createUser = await auth.createUser("github", email, {
            user_data: {
                email,
            },
        });
        return new Response(null, {
            status: 302,
            headers: {
                "set-cookie": createUser.cookies.join(),
                location: "/",
            },
        });
    } catch (e) {
        const error = e as Error;
        // violates email column unique constraint
        if (error.message === "AUTH_DUPLICATE_USER_DATA") {
            return new Response(
                JSON.stringify({
                    message: "Email already in use",
                }),
                {
                    status: 400
                }
            );
        }
        // database connection error
        return new Response(
            JSON.stringify({
                message: "An unknown error occurred",
            }),
            {
                status: 500,
            }
        );
    }
};