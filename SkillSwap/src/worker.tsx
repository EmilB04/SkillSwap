import { defineApp, ErrorResponse, RequestInfo } from "rwsdk/worker";
import { route, render, RouteDefinition, prefix } from "rwsdk/router";
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
import type { UserProfile } from "./app/pages/user/profile/profileData";
import Job from "./app/components/job/Job";

export { SessionDurableObject } from "./session/durableObject";

import { adsRoutes } from "./features/ads/ads.routes";
import { messagesRoutes } from "./features/messages/messages.routes";
import { reviewsRoutes } from "./features/reviews/reviews.routes";
import { notificationsRoutes } from "./features/notifications/notifications.routes";
import { profileRoutes } from "./features/profile/profile.routes";

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

    // Job detail route
    route("/job/:id", Job),

    // Contact route
    route("/contact", Contact),

    // Profile routes (protected - require authentication)
    route("/profile", [requireAuth, MyPage]),
    route("/profile/edit", [requireAuth, EditPage]),
    route("/profile/messages", [requireAuth, MessagesPage]),
    route("/profile/notifications", [requireAuth, NotificationsPage]),
    route("/profile/settings", [requireAuth, SettingsPage]),
    // Ads routes
    prefix("/api/v1/ads", adsRoutes),
    // Messages routes
    prefix("/api/v1/messages", messagesRoutes),
    // Reviews routes
    prefix("/api/v1/reviews", reviewsRoutes),
    // Notifications routes
    prefix("/api/v1/notifications", notificationsRoutes),
    // Profile routes
    prefix("/api/v1/profile", profileRoutes),

    // Protected route example
    route("/protected", [requireAuth, Home]),
  ]),
]);

