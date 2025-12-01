// src/features/auth/auth.routes.ts
import { route, type RouteDefinition } from "rwsdk/router";
import { authService } from "@/features/auth/auth.service";
import { LoginDTOSchema, RegisterDTOSchema } from "@/db/schema/auth/dtos";
import { setSessionCookie } from "@/app/lib/auth/session";

export const authRoutes: RouteDefinition[] = [
  // POST /api/login
  route("/login", async ({ request }) => {
    try {
      const body = await request.json();

      const parsed = LoginDTOSchema.safeParse(body);
      if (!parsed.success) {
        return new Response(
          JSON.stringify({
            success: false,
            error: { message: "Invalid email or password", code: 401 },
          }),
          {
            status: 401,
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      const result = await authService.login(parsed.data);

      if (!result.success) {
        const status = result.error.code ?? 500;
        return new Response(JSON.stringify(result), {
          status,
          headers: { "Content-Type": "application/json" },
        });
      }

      const headers = new Headers();
      headers.set("Content-Type", "application/json");
      headers.set("Set-Cookie", setSessionCookie(result.data.session.id));

      return new Response(JSON.stringify(result), {
        status: 200,
        headers,
      });
    } catch (error) {
      console.error("Login route error:", error);
      return new Response(
        JSON.stringify({
          success: false,
          error: { message: "Login failed", code: 500 },
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  }),

  // POST /api/register
  route("/register", async ({ request }) => {
    try {
      const body = await request.json();

      const parsed = RegisterDTOSchema.safeParse(body);
      if (!parsed.success) {
        return new Response(
          JSON.stringify({
            success: false,
            error: { message: "Invalid registration data", code: 400 },
          }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      const result = await authService.register(parsed.data);

      if (!result.success) {
        const status = result.error.code ?? 500;
        return new Response(JSON.stringify(result), {
          status,
          headers: { "Content-Type": "application/json" },
        });
      }

      const headers = new Headers();
      headers.set("Content-Type", "application/json");
      headers.set("Set-Cookie", setSessionCookie(result.data.session.id));

      return new Response(JSON.stringify(result), {
        status: 200,
        headers,
      });
    } catch (error) {
      console.error("Register route error:", error);
      return new Response(
        JSON.stringify({
          success: false,
          error: { message: "Registration failed", code: 500 },
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  }),
];
