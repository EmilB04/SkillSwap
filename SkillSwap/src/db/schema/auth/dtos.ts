import { z } from "zod";

// DTO for login 
export const LoginDTOSchema = z.object({
    email: z.email(),
    password: z.string().min(8, "Password is required and must be at least 8 characters long"),
});

// DTO for registration
export const RegisterDTOSchema = z.object({
    name: z.string().min(2).max(100),
    email: z.email(),
    password: z.string().min(8, "Password is required and must be at least 8 characters long"),
});

// DTO for user response without passwordHash
export const UserDTOSchema = z.object({
    id: z.coerce.number(),
    name: z.string(),
    email: z.email(),
    role: z.enum(["user", "moderator", "admin"]),
    isActive: z.boolean(),
    lastLoginAt: z.date().nullable(),
    createdAt: z.date(),
    updatedAt: z.date().nullable(),
});

// Session DTO
export const SessionDTOSchema = z.object({
    id : z.string(),
    userId: z.coerce.number(),
    expiresAt: z.date(),
    createdAt: z.date(),
});

// Auth response DTO
export const AuthResponseDTOSchema = z.object({
    user: UserDTOSchema,
    session: SessionDTOSchema,
});

// Types inferred from DTO schemas
export type LoginDTO = z.infer<typeof LoginDTOSchema>;
export type RegisterDTO = z.infer<typeof RegisterDTOSchema>;
export type UserDTO = z.infer<typeof UserDTOSchema>;
export type SessionDTO = z.infer<typeof SessionDTOSchema>;
export type AuthResponseDTO = z.infer<typeof AuthResponseDTOSchema>;

