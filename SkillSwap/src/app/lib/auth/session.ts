import { db, usersRelations } from "@/db";
import { sessions, users } from "@/db";
import type { SafeUser, Session } from "@/db/";
import { eq, and, gt, lt } from "drizzle-orm";
import { createId } from "../utils/id";
import type { Result } from "@/types/results";

// Basert på eksempel fra kurset webapp 2025 på Ulearn (session.ts)

// Session duration in milliseconds 
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
export const SESSION_COOKIE_NAME = "skillSwapSessionId";

// Create a new session for a user
export async function createSession(userId: number): Promise<Result<Session>> {
    try {
        const sessionId = createId();
        const expires_at = new Date(Date.now() + SESSION_DURATION_MS);

        const [newSession] = await db
            .insert(sessions)
            .values({
                id: sessionId,
                userId,
                expiresAt: expires_at,
            })
            .returning();
        
        return { success: true, data: newSession };

    } catch (error) {
        console.error("Error creating session:", error);
        return { success: false, error: { message: "Failed to create session.", code: 500 } };
    };
}

// Get session from sessionId
export async function getSession(
  sessionId: string): Promise<Result<{ session: Session; user: SafeUser } | null>> {
  try {
    const rows = await db
      .select({
        session: sessions,
        user: {
          id: users.id,
          name: users.name,
          email: users.email,
          role: users.role,
          isActive: users.isActive,
          lastLoginAt: users.lastLoginAt,
          createdAt: users.createdAt,
          updatedAt: users.updatedAt,
        },
      })
      .from(sessions)
      .innerJoin(users, eq(sessions.userId, users.id))
      .where ( and (
        eq(sessions.id, sessionId),
        gt(sessions.expiresAt, new Date()),
        eq(users.isActive, true)
      )
    )
    .limit(1);

    if (rows.length === 0) {
        return {
            success: true, data: null,
        };
    }

    const { session, user } = rows[0];

    await db
        .update(users)
        .set({ lastLoginAt: new Date() })
        .where(eq(users.id, user.id));

    return {
        success: true, data: { session, user },
    };
  } catch (error) {
    console.error ("Error getting session", error);
    return {
        success: false, error: {
            message: "Failed to get session", code: 500,
        },
    };
  }
}

// Delete a session
export async function deleteSession(sessionId: string): Promise<Result<void>> {
    try {
        await db.delete(sessions).where(eq(sessions.id, sessionId));

        return {
            success: true, data: undefined,
        };
    } catch (error) {
        console.error("Error while deleting session", error);
        return {
            success: false, error: {
                message: "Failed to delete session", code: 500,
            },
        };
    }
}

// Cleanup of expired sessions
export async function cleanupExpiredSessions(): Promise<Result<number>> {
    try {
        const deleted = await db
            .delete(sessions)
            .where(lt(sessions.expiresAt, new Date()))
            .returning({ id: sessions.id })

        return {
            success: true, data: deleted.length,
        };
    } catch (error) {
        console.error("Error cleaning up expired sessions", error);
        return {
            success: false, error: {
                message: "Failed to cleanup expired sessions", code: 500,
            },
        };
    }
}

// Cookie config protection against XSS and CSRF attacks
export function getSessionCookieOptions() {
    return {
        httpOnly: true, 
        secure: process.env.NODE_ENV === "production",
        sameSite: "Lax" as const,
        maxAge: SESSION_DURATION_MS / 1000,
        path: "/",
    };
}

// Get sessionId from Cookie-header
export function extractSessionFromCookies(cookieHeader: string): string | null {
    const cookies = cookieHeader.split(";").map((c) => c.trim()); 

    for (const cookie of cookies) {
        const [name, value] = cookie.split("=");
        if (name === SESSION_COOKIE_NAME) {
            return decodeURIComponent(value);
        }
    }

    return null;
}

// Set session cookie

