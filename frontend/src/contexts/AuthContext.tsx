import Router from "next/router";
import { destroyCookie, setCookie } from "nookies";
import { createContext, ReactNode, useContext, useState } from "react";
import { api } from "../services/apiClient";

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
    signOut: () => void;
}

type UserProps = {
    id: string;
    name: string;
    email: string;
}

type SignInProps = {
    email: string;
    password: string;
}

type AuthProviderProps = {
    children: ReactNode;
}


export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {

    const [user, setUser] = useState<UserProps>();
    const isAuthenticated = !!user;

    async function signIn({ email, password }: SignInProps) {
        try {
            
            const response = await api.post('/session', { email, password });

            const { id, name, token } = response.data;

            setCookie(undefined, '@pizzaAuth.token', token, {
                maxAge: 60 * 60 * 24 * 30,
                path: '/'
            });

            setUser({
                id, name, email
            });

            api.defaults.headers['Authorization'] = `Bearer ${token}`;

            //Route to dashboard

            Router.push('/dashboard');

        } catch (error) {
            console.log("Login error", error);
        }

    }


    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export function signOut() {
    try {
        destroyCookie(undefined, '@pizzaAuth.Token');
        Router.push('/');
    } catch (e) {
        console.log('Logout failed')
    }
}