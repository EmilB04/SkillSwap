import { defineApp, ErrorResponse } from "rwsdk/worker";
import { route, render } from "rwsdk/router";
import { Document } from "@/app/Document";
import { Home } from "@/app/pages/Home";
import { setCommonHeaders } from "@/app/headers";
import { sessions, setupSessionStore } from "./session/store";
import Explore from "@/app/pages/Explore";
import { Session } from "./session/durableObject";
import { db } from "@/db";
import { users, type User } from "@/db/schema";
import { eq } from "drizzle-orm";
import { env } from "cloudflare:workers";
import { Login } from "./app/pages/user/account/Login";
import { Register } from "./app/pages/user/account/Register";
import { MyPage } from "./app/pages/user/profile/MyPage";
import { MessagesPage } from "./app/pages/user/profile/MessagesPage";
import { NotificationsPage } from "./app/pages/user/profile/NotificationsPage";
import SettingsPage from "./app/pages/user/profile/SettingsPage";
import EditPage from "./app/pages/user/profile/EditPage";
import Contact from "./app/pages/Contact";

export { SessionDurableObject } from "./session/durableObject";

export type AppContext = {
  session: Session | null;
  user: User | null;
};

// Authentication middleware - requires user to be logged in
const requireAuth = ({ ctx }: { ctx: AppContext }) => {
  if (!ctx.user) {
    return new Response(null, { 
      status: 302, 
      headers: { Location: "/login" } 
    });
  }
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

    // Temporary: Always set test user to verify header works: See TODO below
    // To test authentication: Comment out the lines below to see redirects to /login
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
    route("/logout", async function ({ request }) {
      const headers = new Headers();
      await sessions.remove(request, headers);
      headers.set("Location", "/");
      return new Response(null, { status: 302, headers });
    }),

    // Explore route
    route("/explore", Explore),

    // Contact route
    route("/contact", Contact),

    // Profile routes (protected - require authentication)
    route("/profile", [requireAuth, MyPage]),
    route("/profile/edit", [requireAuth, EditPage]),
    route("/profile/messages", [requireAuth, MessagesPage]),
    route("/profile/notifications", [requireAuth, NotificationsPage]),
    route("/profile/settings", [requireAuth, SettingsPage]),

    // Protected route example
    route("/protected", [requireAuth, Home]),
  ]),
]);
