import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, ReactNode, useState } from "react";
import { api } from "../services/api";


type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;

}

type UserProps = {
    id: string;
    name: string;
    email: string;
    token: string;
}

type AuthProviderProps = {
    children: ReactNode;
}

type SignInProps = {
    email: string;
    password: string;
}


export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {

    const [user, setUser] = useState<UserProps>({
        id: '',
        name: '',
        email: '',
        token: ''
    });

    const [loadingAuth, setLoadingAuth] = useState(false);

    const isAuthenticated = !!user.name; // se tiver nome, será true

    async function signIn({ email, password }: SignInProps) {

        setLoadingAuth(true);

        try {
            const response = await api.post('/session', {
                email,
                password
            });

            const { id, name, token } = response.data;
            const data = {
                ...response.data
            }

            await AsyncStorage.setItem('@pizzaAuth', JSON.stringify(data));

            api.defaults.headers.common['Authorization'] = "Bearer " + token;

            setUser({ id, name, token, email });

            setLoadingAuth(false);


        } catch (error) {
            console.log("Login error", error);
            setLoadingAuth(false);
        }

    }



    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
            {children}
        </AuthContext.Provider>
    )

}