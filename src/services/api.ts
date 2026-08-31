import { createApi } from '../src/integration/httpClient';
import { mockLogin, mockRegister } from '../src/mock/mockAuth';
import { AuthRequest, RegisterRequest, SessionUser } from '../src/types/auth';

const USE_MOCK = process.env.EXPO_PUBLIC_USE_MOCK === 'true';

const authApi = createApi(`${process.env.EXPO_PUBLIC_API_URL}/auth/v1`);

export const login = async (data: AuthRequest): Promise<SessionUser> => {
    if (USE_MOCK) {
        return mockLogin(data);
    }
    const response = await authApi.post('/auth', data);
    return response.data;
};

export const register = async (data: RegisterRequest): Promise<void> => {
    if (USE_MOCK) {
        return mockRegister(data);
    }
    await authApi.post('/register', data);
};

export const logout = async (): Promise<void> => {
    if (USE_MOCK) {
        return;
    }
    await authApi.post('/logout');
};