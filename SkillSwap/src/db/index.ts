export * from "./schema/users";
export * from "./schema/profile-details";
export * from "./schema/ads";
export * from "./schema/direct-messages";
export * from "./schema/reviews";
export * from "./schema/notifications";
export * from "./schema/relations"; 
import { drizzle } from "drizzle-orm/d1";
import { env } from "cloudflare:workers";
import * as schema from "./schema";

export const db = drizzle(env.DB, { schema });
