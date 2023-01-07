import React, { createContext, useState } from "react";


type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
}

type UserProps = {
    id: string;
    name: string;
    email: string;
    token: string;
}


export const AuthContext = createContext({} as AuthContextData);

const [user, setUser] = useState<UserProps>({
    id: '',
    name: '',
    email: '',
    token: ''
});

const isAuthenticated = !!user.name; // se tiver nome, será true

export function AuthProvider(){

    return (
        <AuthContext.Provider value={{}}>

        </AuthContext.Provider>
    )

}