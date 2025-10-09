import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { timestamps } from "./columns.helpers";
import { users } from "./users";

// https://orm.drizzle.team/docs/sql-schema-declaration 

export const reviews = sqliteTable("reviews", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    reviewerId: integer("reviewer_id").notNull().references(() => users.id),
    receiverId: integer("receiver_id").notNull().references(() => users.id),
    rating: integer("rating").notNull().$type<1 | 2 | 3 | 4 | 5>(),
    reviewText: text("review_text"),
    ...timestamps,
});

export type Review = typeof reviews.$inferSelect;