import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/api";


type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
    signOut: () => Promise<void>;
    loadingAuth: boolean;
    loading: boolean;

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

    const [loadingAuth, setLoadingAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
     
        async function getUser() {
            //Get data saved in AsyncStorage
            const userInfo = await AsyncStorage.getItem('@pizzaAuth');
            let hasUser: UserProps = JSON.parse(userInfo || '{}');
            //Verify is the data exists
            if (Object.keys(hasUser).length > 0) {
                api.defaults.headers.common['Authorization'] = 'Bearer ' + hasUser.token;

                setUser({
                    id: hasUser.id,
                    name: hasUser.name,
                    email: hasUser.email,
                    token: hasUser.token
                });
            }
            setLoading(false);
        }
        getUser();

    }, [])

    const [user, setUser] = useState<UserProps>({
        id: '',
        name: '',
        email: '',
        token: ''
    });



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

    async function signOut() {
        await AsyncStorage.clear()
            .then(() => {
                setUser({
                    id: '',
                    name: '',
                    email: '',
                    token: ''
                })
            })
    }



    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut, loading, loadingAuth }}>
            {children}
        </AuthContext.Provider>
    )

}