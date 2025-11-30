import type { AppContext } from "@/worker";
import type { UserRole } from "@/db";
import { hasRole } from "../lib/auth/role";

// Authorization middleware to enforce authentication
export function requireAuth() {
    return ({ ctx }: { ctx: AppContext; }): Response | void => {
        if (!ctx.user) {
            return new Response(null, 
                { status: 302, headers: {Location: "/login"},
            });
        }

        if (!ctx.user.isActive) {
            return new Response(
                JSON.stringify({
                    error: { message: "Account is inactive", },
                }),
                { status: 403, headers: { "Content-Type": "application/json" } }
            );
        }
    };
}

// Middleware to require a specific user role
export function requireRole(role: UserRole) {
    return ({ ctx }: { ctx: AppContext; }): Response | void => {
        if (!ctx.user) {
            return new Response(null, {
                    status: 302, headers: {Location: "/login"},
        }); 
        }
        if (!hasRole(ctx.user, role)) {
            return new Response(
                JSON.stringify({
                    error: { message: "Insufficient permissions", },
                }),
                { status: 403, headers: { "Content-Type": "application/json" } }
            )
        };
    }
}

// Middleware to require admin role
export function requireAdmin() {
    return requireRole("admin");
}

// Middleware to require moderator role
export function requireModerator() {
    return requireRole("moderator");
}
