import type { AppContext } from "@/worker";
import { extractSessionFromCookies, getSession } from "../lib/auth/session";

// Authentication middleware to attach user and session to the context based on session cookies
export async function authenticationMiddleware({ ctx, request }: { ctx: AppContext; request: Request; }) {
    // No user or session by default
    ctx.user = null;
    ctx.session = null;

    try {
        const cookies = request.headers.get("cookie");
        if (!cookies) return;

        const sessionId = extractSessionFromCookies(cookies);
        if (!sessionId) return;

        const sessionResult = await getSession(sessionId);
        if (!sessionResult.success || !sessionResult.data) return; 

        const { session, user } = sessionResult.data;

        ctx.user = user;
        ctx.session = session;
    } catch (error) {
        console.error("Error in authentication middleware:", error);
        ctx.user = null;
        ctx.session = null;
    }
}