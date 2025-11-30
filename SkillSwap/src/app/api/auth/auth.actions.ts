import { authService } from "@/features/auth/auth.service"; 
import { LoginDTOSchema, RegisterDTOSchema } from "@/db/schema/auth/dtos";
import { setSessionCookie, clearSessionCookie } from "@/app/lib/auth/session";
import type { Result } from "@/types/results";
import { SafeUser, Session } from "@/db";

function defineAction<T extends (form: FormData) => Promise<any>>(fn: T): T {
    return fn;
}

// Action for user registration
export const registerAction = async (form: FormData): Promise<Result<unknown>> =>{
    const credentials = {
        name: form.get("name") as string,
        email: form.get("email") as string,
        password: form.get("password") as string,
    };

    const parsed = RegisterDTOSchema.safeParse(credentials);
    if (!parsed.success) {
        const result: Result<never> = {
            success: false,
            error: { message: "Invalid registration data", code: 400 },
        };
        return result;
    }

    const result = await authService.register(parsed.data);

    if (!result.success) {
        return result;
    }

    const cookie = setSessionCookie(result.data.session.id);

    return {
        ...result,
        headers: {
            "Set-Cookie": cookie,
        },
    } as any;
};

// Action for user login
export const loginAction = defineAction(async (form: FormData) => {
    const credentials = {
        email: form.get("email") as string,
        password: form.get("password") as string,
    };

    const parsed = LoginDTOSchema.safeParse(credentials);
    if (!parsed.success) {
        const result: Result<never> = {
            success: false,
            error: { message: "Invalid login data", code: 401 },
        };
        return result;
    }

    const result = await authService.login(parsed.data);

    if (!result.success) {
        return result;
    }
    
    const cookie = setSessionCookie(result.data.session.id);

    return {
        ...result,
        headers: {
            "Set-Cookie": cookie,
        },
    } as any;
});

// Action for user logout
export const logoutAction = async (): Promise<Result<{ message: string }>> => {
    const cookie = clearSessionCookie();

    return {
        success: true,
        data: { message: "Logged out successfully" },
        headers: {
            "Set-Cookie": cookie,
        },
    } as any;
};

