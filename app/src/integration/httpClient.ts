import axios from 'axios';

type UnauthorizeHandler = () => void;

let unauthorize: UnauthorizeHandler | null = null;

export function setUnauthorizeHandler(handler: UnauthorizeHandler) {
    unauthorize = handler;
}

export function createApi(baseURL: string) {
    const instance = axios.create({
        baseURL,
        withCredentials: true,
    });

    instance.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response?.status === 401) {
                unauthorize?.();
            }
            return Promise.reject(error);
        }
    );

    return instance;
}
