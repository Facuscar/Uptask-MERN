import React, { useState, useEffect, createContext, ReactNode } from "react";

type Auth = {
    email: string,
    name: string,
    token: string,
    _id: string,
}

type ContextType = {
    setAuth: (auth: Auth) => void,
};

const AuthContext = createContext<ContextType | null>(null);

export const AuthProvider = ({ children } : { children: ReactNode}) => {

    const [auth, setAuth] = useState<Auth | null>();

    return (
        <AuthContext.Provider value={{
            setAuth
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;