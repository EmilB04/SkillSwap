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
import Contact from "./app/pages/Contact";
import Job from "./app/pages/Job";
import NewAd from "@/app/pages/NewAd";

import type { Session, SafeUser } from "@/db";
import { authenticationMiddleware } from "./app/middleware/authentication";
import { requireAuth } from "@/app/middleware/authorization";
import { clearSessionCookie } from "@/app/lib/auth/session";


import { adsRoutes } from "./features/ads/ads.routes";
import { messagesRoutes } from "./features/messages/messages.routes";
import { reviewsRoutes } from "./features/reviews/reviews.routes";
import { notificationsRoutes } from "./features/notifications/notifications.routes";
import { profileRoutes } from "./features/profile/profile.routes";
 

export type AppContext = {
  session: Session | null;
  user: SafeUser | null;
};

export default defineApp([
  setCommonHeaders(),
  authenticationMiddleware,
  render(Document, [
    // Home route
    route("/", Home),

    // Auth routes
    route("/login", Login),
    route("/register", Register),

    route("/logout", () => {
      const headers = new Headers();
      headers.set("Set-Cookie", clearSessionCookie());
      headers.set("Location", "/");
      return new Response(null, { status: 302, headers });
    }),

    // Explore route
    route("/explore", Explore),

    // New Ad route
    route("/new-add", [requireAuth(), NewAd]),

    // Job detail route
    route("/job/:slug", Job),

    // Contact route
    route("/contact", Contact),

    // Profile routes (protected - require authentication)
    route("/profile", [requireAuth(), MyPage]),
    route("/profile/edit", [requireAuth(), EditPage]),
    route("/profile/messages", [requireAuth(), MessagesPage]),
    route("/profile/notifications", [requireAuth(), NotificationsPage]),
    route("/profile/settings", [requireAuth(), SettingsPage]),

    // API routes
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
     route("/protected", [requireAuth(), Home]),
  ]),
]);

