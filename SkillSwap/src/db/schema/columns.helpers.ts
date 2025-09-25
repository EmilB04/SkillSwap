import { text } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import { create } from "domain";

// https://orm.drizzle.team/docs/sql-schema-declaration 

export const timestamps = {
    createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text("updated_at"),  
    deletedAt: text("deleted_at"),
};
