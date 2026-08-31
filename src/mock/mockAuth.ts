import { AuthRequest, SessionUser } from "../types/auth";

const FAKE_USERS: Record<string, { password: string; user: SessionUser }> = {
    kleber: {
        password: "senha@senha",
        user: { userId: "1", username: "kleber", roles: ["USER"] }
    }
};

function delay<T>(value: T, ms = 600): Promise<T> {
    return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export async function mockLogin(data: AuthRequest): Promise<SessionUser> {
    const record = FAKE_USERS[data.username];

    if (!record || record.password !== data.password) {
        // simula o erro que o axios real jogaria (response.status 401)
        const error: any = new Error("Credenciais inválidas");
        error.response = { status: 401, data: { message: "Usuário ou senha inválidos" } };
        throw error;
    }

    return delay(record.user);
}

export async function mockRegister(data: AuthRequest & { email: string }): Promise<void> {
    FAKE_USERS[data.username] = {
        password: data.password,
        user: { userId: String(Object.keys(FAKE_USERS).length + 1), username: data.username, roles: ["USER"] }
    };
    await delay(undefined);
}