import { route } from "rwsdk/router";
import { Login } from "./Login";
import { Register } from "./Register";
import { sessions } from "@/session/store";
import { Home } from "../Home";

export const userRoutes = [
  route("/", [Home]),
  route("/login", [Login]),
  route("/register", [Register]),
  route("/logout", async function ({ request }) {
    const headers = new Headers();
    await sessions.remove(request, headers);
    headers.set("Location", "/");

    return new Response(null, {
      status: 302,
      headers,
    });
  }),
];
