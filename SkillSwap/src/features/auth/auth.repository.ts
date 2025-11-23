import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import type { User, InsertUser, SafeUser } from "@/db/schema";
import type { Result } from "../../types/results";

// Repository interface for managing authentication-related operations
export interface AuthRepository {
    findUserByEmail(email: string): Promise<Result<User | null>>;
    findUserById(id: number): Promise<Result<SafeUser | null>>;
    createUser(data: InsertUser): Promise<Result<SafeUser>>;
    updateLastLogin(userId: number): Promise<Result<void>>;
}

// Create an instance of AuthRepository
export function createAuthRepository(): AuthRepository {
    return {
        async findUserByEmail(email) {
            try {
                const rows = await db
                    .select()
                    .from(users)
                    .where(eq(users.email, email))
                    .limit(1);

                return { success: true, data: rows[0] || null };

            } catch (error) {
                console.error("Error finding user by email", error);
                return {
                    success: false,
                    error: { message: "Failed to find user by email", code: 500 },
                };
            }
        },

        async findUserById(id) {
            try {
                const rows = await db
                  .select({
                    id: users.id,
                    name: users.name,
                    email: users.email,
                    role: users.role,
                    isActive: users.isActive,
                    lastLoginAt: users.lastLoginAt,
                    createdAt: users.createdAt,
                    updatedAt: users.updatedAt,
                 })
                 .from(users)
                 .where(eq(users.id, id))
                 .limit(1);


                return { success: true, data: rows[0] || null };
            } catch (error) {
                console.error("Error finding user by ID", error);
                return {
                    success: false,
                    error: { message: "Failed to find user by ID", code: 500 },
                };
            }
        },

        async createUser(data) {
            try {
                const [newUser] = await db
                    .insert(users)
                    .values(data)
                    .returning({
                        id: users.id,
                        name: users.name,
                        email: users.email,
                        role: users.role,
                        isActive: users.isActive,
                        lastLoginAt: users.lastLoginAt,
                        createdAt: users.createdAt,
                        updatedAt: users.updatedAt,
                    });

                return { success: true, data: newUser };
            } catch (error) {
                console.error("Error creating user", error);
                return {
                    success: false,
                    error: { message: "Failed to create user", code: 500 },
                };
            }
        },

        async updateLastLogin(userId) {
            try {
                await db
                    .update(users)
                    .set({ lastLoginAt: new Date() })
                    .where(eq(users.id, userId));
                    
                return { success: true, data: undefined };
            } catch (error) {
                console.error("Error updating last login", error);
                return {
                    success: false,
                    error: { message: "Failed to update last login", code: 500 },
                };
            }
        },
    };
}

export const authRepository = createAuthRepository();