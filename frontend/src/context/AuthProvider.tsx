import axios from "axios";
import { useState, useEffect, createContext, ReactNode } from "react";
import { useNavigate } from 'react-router-dom';

import { getConfig } from "utils/getConfig";

type User = {
    email: string,
    name: string,
    _id: string,
};

type Context = {
    setAuth: (auth: User) => void,
    auth: User | null,
    loading: boolean,
};


const AuthContext = createContext<Context | null>(null);

export const AuthProvider = ({ children } : { children: ReactNode}) => {

    const [auth, setAuth] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const navigate = useNavigate();

    useEffect(() => {
        const authUser = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const { data } = await axios<User>(`${import.meta.env.VITE_API_USERS_URL}/profile`, getConfig(token));
                setAuth(data);
            } catch (error: any) {
                setAuth(null);
            } finally {
                setLoading(false);
            }
        };
        
        authUser();
    }, []);

    return (
        <AuthContext.Provider value={{
            auth,
            setAuth,
            loading,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;