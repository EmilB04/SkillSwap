import { defineApp } from "rwsdk/worker";
import { route, render, prefix } from "rwsdk/router";
import { Document } from "@/app/Document";
import { Home } from "@/app/pages/Home";
import { setCommonHeaders } from "@/app/headers";
import Explore from "@/app/pages/Explore";
import { Login } from "./app/pages/user/account/Login";
import { Register } from "./app/pages/user/account/Register";
import { MyPage } from "./app/pages/user/profile/MyPage";
import { MessagesPage } from "./app/pages/user/profile/MessagesPage";
import { NotificationsPage } from "./app/pages/user/profile/NotificationsPage";
import SettingsPage from "./app/pages/user/profile/SettingsPage";
import EditPage from "./app/pages/user/profile/EditPage";
import { ViewProfilePage } from "./app/pages/user/profile/ViewProfilePage";
import Contact from "./app/pages/Contact";
import Job from "./app/pages/Job";
import NewAd from "@/app/pages/NewAd";

import type { Session, SafeUser } from "@/db/schema";
import { authenticationMiddleware } from "@/app/middleware/authentication";
import { requireAuth } from "@/app/middleware/authorization";
import { clearSessionCookie } from "@/app/lib/auth/session";

import { adsRoutes } from "./features/ads/ads.routes";
import { messagesRoutes } from "./features/messages/messages.routes";
import { reviewsRoutes } from "./features/reviews/reviews.routes";
import { notificationsRoutes } from "./features/notifications/notifications.routes";
import { profileRoutes } from "./features/profile/profile.routes";
import { authRoutes } from "./features/auth/auth.routes";

export type AppContext = {
  session: Session | null;
  user: SafeUser | null;
};

export default defineApp([
  setCommonHeaders(),

  // Her settes ctx.user og ctx.session basert på cookie
  authenticationMiddleware,

  // API-ruter 
  prefix("/api", authRoutes),
  prefix("/api/v1/ads", adsRoutes),
  prefix("/api/v1/messages", messagesRoutes),
  prefix("/api/v1/reviews", reviewsRoutes),
  prefix("/api/v1/notifications", notificationsRoutes),
  prefix("/api/v1/profile", profileRoutes),

  // Page-ruter
  render(Document, [
    // Home route
    route("/", Home),

    // Auth pages
    route("/login", Login),
    route("/register", Register),

    // Logout, clearing session cookie + redirect
    route("/logout", () => {
      const headers = new Headers();
      headers.set("Set-Cookie", clearSessionCookie());
      headers.set("Location", "/");
      return new Response(null, { status: 302, headers });
    }),

    // Explore route
    route("/explore", Explore),

    // New Ad route (krever login)
    route("/new-add", [requireAuth(), NewAd]),

    // Job detail route
    route("/job/:slug", Job),

    // Contact route
    route("/contact", Contact),

    // Profile routes (beskyttet)
    route("/profile", [requireAuth(), MyPage]),
    route("/profile/edit", [requireAuth(), EditPage]),
    route("/profile/messages", [requireAuth(), MessagesPage]),
    route("/profile/notifications", [requireAuth(), NotificationsPage]),
    route("/profile/settings", [requireAuth(), SettingsPage]),
    
    // Public profile view
    route("/profile/view/:userId", ViewProfilePage),

    // Protected route example
    route("/protected", [requireAuth(), Home]),
  ]),
]);
