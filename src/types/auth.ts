export type AuthRequest = {
    username: string;
    password: string;
};

export type RegisterRequest = AuthRequest & {
    username: string;
};

export type SessionUser = {
    userId: string;
    username: string;
    roles?: string[];
};