import { defineApp, ErrorResponse } from "rwsdk/worker";
import { route, render, prefix } from "rwsdk/router";
import { Document } from "@/app/Document";
import { Home } from "@/app/pages/Home";
import { setCommonHeaders } from "@/app/headers";
import { userRoutes } from "@/app/pages/user/routes";
import { sessions, setupSessionStore } from "./session/store";
import { Session } from "./session/durableObject";

import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { env } from "cloudflare:workers";
export { SessionDurableObject } from "./session/durableObject";

import { adsRoutes } from "./features/ads/ads.routes";
import { messagesRoutes } from "./features/messages/messages.routes";
import { reviewsRoutes } from "./features/reviews/reviews.routes";
import { notificationsRoutes } from "./features/notifications/notifications.routes";
import { profileRoutes } from "./features/profile/profile.routes";

export type AppContext = {
  session: Session | null;
  user: User | null;
};


/* DENNE VIRKET IKKE
export default defineApp([
  setCommonHeaders(),
  async ({ ctx, request, headers }) => {
    await setupDb(env);
    setupSessionStore(env);

    try {
      ctx.session = await sessions.load(request);
    } catch (error) {
      if (error instanceof ErrorResponse && error.code === 401) {
        await sessions.remove(request, headers);
        headers.set("Location", "/user/login");

        return new Response(null, {
          status: 302,
          headers,
        });
      }

      throw error;
    }

    if (ctx.session?.userId) {
      ctx.user = await db.user.findUnique({
        where: {
          id: ctx.session.userId,
        },
      });
    }
  }, 
*/


export default defineApp([
  setCommonHeaders(),
  async ({ ctx, request, headers }) => {
    setupSessionStore(env);

    try {
      ctx.session = await sessions.load(request);
    } catch (error) {
      if (error instanceof ErrorResponse && error.code === 401) {
        await sessions.remove(request, headers);
        headers.set("Location", "/user/login");

        return new Response(null, {
          status: 302,
          headers,
        });
      }

      throw error;
    }

    if (ctx.session?.userId) {
      const userResult = await db.select().from(users).where(eq(users.id, parseInt(ctx.session.userId))).limit(1);
      ctx.user = userResult[0] || null;
    }
  },
  render(Document, [
    // Home route
    route("/", Home),
    // User routes
    prefix("/user", userRoutes),
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
    route("/protected", [
      ({ ctx }) => {
        if (!ctx.user) {
          return new Response(null, {
            status: 302,
            headers: { Location: "/user/login" },
          });
        }
      },
      Home,
    ]),
  ]),
]);
