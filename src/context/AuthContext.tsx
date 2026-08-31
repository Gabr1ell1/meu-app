import { login as loginApi, logout as logoutApi, register as registerApi } from "@/services/api";
import { setUnauthorizeHandler } from "@/src/integration/httpClient";
import { AuthRequest, RegisterRequest, SessionUser } from "@/src/types/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { createContext, useContext, useEffect, useState } from "react";

type AuthContextData = {
    isAuthenticated: boolean;
    user: SessionUser | null;
    isLoading: boolean;
    signIn: (data: AuthRequest) => Promise<{ ok: boolean }>;
    signUp: (data: RegisterRequest) => Promise<{ ok: boolean; error?: string }>;
    signOut: () => void;
};

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<SessionUser | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    async function persistSession(sessionUser: SessionUser) {
        setUser(sessionUser);
        setIsAuthenticated(true);
        await AsyncStorage.setItem("@Auth:user", JSON.stringify(sessionUser));
    }

    async function clearSession() {
        setUser(null);
        setIsAuthenticated(false);
        await AsyncStorage.removeItem("@Auth:user");
    }

    useEffect(() => {
  (async () => {
    try {
      const raw = await AsyncStorage.getItem("@Auth:user");

      if (raw) {
        try {
          const parsedUser = JSON.parse(raw);

          setUser(parsedUser);
          setIsAuthenticated(true);
        } catch {
          console.log("Sessão inválida. Limpando...");
          await AsyncStorage.removeItem("@Auth:user");
        }
      }
    } catch (error) {
      console.log("Erro ao recuperar sessão:", error);
    } finally {
      setIsLoading(false);
    }
  })();
}, []);

    useEffect(() => {
        setUnauthorizeHandler(() => {
            clearSession();
            router.replace("/");
        });
    }, []);

    async function signIn(data: AuthRequest) {
        try {
            const sessionUser = await loginApi(data);
            await persistSession(sessionUser);
            return { ok: true };
        } catch {
            return { ok: false };
        }
    }

    async function signUp(data: RegisterRequest) {
        try {
            await registerApi(data);
            return { ok: true };
        } catch (err: any) {
            return { ok: false, error: err.response?.data?.message ?? "Erro desconhecido" };
        }
    }

    async function signOut() {
        await logoutApi();
        await clearSession();
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, isLoading, signIn, signUp, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);