import type { SafeUser, Session } from "@/db";
import type { UserDTO, SessionDTO, AuthResponseDTO, } from "@/db/schema/auth/dtos";

// Map SafeUser to UserDTO
export function mapSafeUserToUserDTO(user: SafeUser): UserDTO {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
        lastLoginAt: user.lastLoginAt,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    };
}

// Map Session to SessionDTO
export function mapSessionToSessionDTO(session: Session): SessionDTO {
    return {
        id: session.id,
        userId: session.userId,
        expiresAt: session.expiresAt,
        createdAt: session.createdAt,
    };
}

// Map SafeUser and Session to AuthResponseDTO
export function mapToAuthResponseDTO(user: SafeUser, session: Session): AuthResponseDTO {
    return {
        user: mapSafeUserToUserDTO(user),
        session: mapSessionToSessionDTO(session),
    };
}