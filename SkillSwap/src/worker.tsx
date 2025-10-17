import { defineApp, ErrorResponse } from "rwsdk/worker";
import { route, render } from "rwsdk/router";
import { Document } from "@/app/Document";
import { Home } from "@/app/pages/Home";
import { setCommonHeaders } from "@/app/headers";
import { sessions, setupSessionStore } from "./session/store";
import { Session } from "./session/durableObject";
import { db } from "@/db";
import { users, type User } from "@/db/schema";
import { eq } from "drizzle-orm";
import { env } from "cloudflare:workers";
import { Login } from "./app/pages/user/account/Login";
import { Register } from "./app/pages/user/account/Register";
import { MyPage } from "./app/pages/user/profile/MyPage";
export { SessionDurableObject } from "./session/durableObject";

export type AppContext = {
  session: Session | null;
  user: User | null;
};

export default defineApp([
  setCommonHeaders(),
  async ({ ctx, request, headers }) => {
    setupSessionStore(env);

    try {
      ctx.session = await sessions.load(request);
    } catch (error) {
      if (error instanceof ErrorResponse && error.code === 401) {
        await sessions.remove(request, headers);
        headers.set("Location", "/login");

        return new Response(null, {
          status: 302,
          headers,
        });
      }

      throw error;
    }

    // Temporary: Always set test user to verify header works
    ctx.user = {
      role: "user",
      id: 1,
      name: "Test User",
      email: "testuser@example.com",
    };

    // TODO: Uncomment this and remove above when auth is working
    // if (ctx.session?.userId) { // Load user if logged in - Get user from DB
    //   const userResult = await db.select().from(users).where(eq(users.id, parseInt(ctx.session.userId))).limit(1);
    //   ctx.user = userResult[0] || null;
    // }
  },
  render(Document, [
    // Home route
    route("/", Home),

    // Auth routes
    route("/login", Login),
    route("/register", Register),

    // Profile route
    route("/profile", MyPage),

    // Logout route
    route("/logout", async function ({ request }) {
      const headers = new Headers();
      await sessions.remove(request, headers);
      headers.set("Location", "/");

      return new Response(null, {
        status: 302,
        headers,
      });
    }),

    // Protected route example
    route("/protected", [
      ({ ctx }) => {
        if (!ctx.user) {
          return new Response(null, {
            status: 302,
            headers: { Location: "/login" },
          });
        }
      },
      Home,
    ]),
  ]),
]);
