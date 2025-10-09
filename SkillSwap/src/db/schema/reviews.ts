import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { timestamps } from "./columns.helpers";
import { users } from "./users";
import { createId } from "@/app/lib/utils/id";

// https://orm.drizzle.team/docs/sql-schema-declaration 

export const reviews = sqliteTable("reviews", {
    id: text("id").primaryKey().$defaultFn(() => createId()),
    reviewerId: integer("reviewer_id").notNull().references(() => users.id, { onDelete: "cascade" }), 
    receiverId: integer("receiver_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    rating: integer("rating").notNull().$type<1 | 2 | 3 | 4 | 5>(),
    reviewText: text("review_text"),
    ...timestamps,
});

export type Review = typeof reviews.$inferSelect;
export type InsertReview = typeof reviews.$inferInsert;