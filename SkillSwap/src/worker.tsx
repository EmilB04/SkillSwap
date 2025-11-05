import { defineApp, ErrorResponse } from "rwsdk/worker";
import { route, render } from "rwsdk/router";
import { Document } from "@/app/Document";
import { Home } from "@/app/pages/Home";
import { setCommonHeaders } from "@/app/headers";
import { sessions, setupSessionStore } from "./session/store";
import Explore from "@/app/pages/Explore";
import { Session } from "./session/durableObject";
import { env } from "cloudflare:workers";
import { Login } from "./app/pages/user/account/Login";
import { Register } from "./app/pages/user/account/Register";
import { MyPage } from "./app/pages/user/profile/MyPage";
import { MessagesPage } from "./app/pages/user/profile/MessagesPage";
import { NotificationsPage } from "./app/pages/user/profile/NotificationsPage";
import SettingsPage from "./app/pages/user/profile/SettingsPage";
import EditPage from "./app/pages/user/profile/EditPage";
import Contact from "./app/pages/Contact";
import { getUserProfile } from "./app/services/userProfileService";
import type { UserProfile } from "./app/components/profile/profileData";

export { SessionDurableObject } from "./session/durableObject";

export type AppContext = {
  session: Session | null;
  user: UserProfile | null;
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

    // Load user profile if session exists
    if (ctx.session?.userId) {
      const userId = parseInt(ctx.session.userId);
      ctx.user = await getUserProfile(userId);
      
      // If user not found in DB but session exists, clear session
      if (!ctx.user) {
        await sessions.remove(request, headers);
        ctx.user = null; // Ensure user is null if not found
      }
    } else {
      // No session - user is not logged in
      ctx.user = null;
    }

    // TEMPORARY: For development/testing with mock user, uncomment the line below
    ctx.user = await getUserProfile(1); // Load mock user with ID 1
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
