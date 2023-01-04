import Router from "next/router";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { api } from "../services/apiClient";

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
    signOut: () => void;
    signUp: (credentials: SignUpProps) => Promise<void>;
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

type SignUpProps = {
    email: string;
    password: string;
    name: string;
}

type AuthProviderProps = {
    children: ReactNode;
}


export const AuthContext = createContext({} as AuthContextData);

export async function signOut() {
    try {
        destroyCookie(undefined, '@pizzaAuth.token');
        Router.push('/');
    } catch (e) {
        console.log('Logout failed', e)
    }
}


export function AuthProvider({ children }: AuthProviderProps) {

    useEffect(() => {

        const { '@pizzaAuth.token': token } = parseCookies();
        if (token) {
            api.get('/me').then(response => {
                const { id, name, email } = response.data;

                setUser({
                    id, name, email
                })
            }).catch(() => { signOut(); })
        }


    }, []);

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
            toast.success("Bem vindo, " + name + "!");

        } catch (error) {
            toast.error("Erro: ", error)
        }

    }

    async function signUp({ name, email, password }: SignUpProps) {
        try {
            const response = await api.post('/users', {
                name,
                email,
                password
            });

            toast.success("Usuário criado com sucesso. Por favor, faça o login");

            Router.push('/');

        } catch (error) {
            toast.warn("Erro ao criar usuário " + error);
            console.error("Sign up failed", error)
        }

    }


    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut, signUp }}>
            {children}
        </AuthContext.Provider>
    )
}

