import axios from "axios";
import { useState, useEffect, createContext, ReactNode } from "react";

type User = {
    email: string,
    name: string,
    _id: string,
};

type ContextType = {
    setAuth: (auth: User) => void,
    auth: User | null,
};


const AuthContext = createContext<ContextType | null>(null);

export const AuthProvider = ({ children } : { children: ReactNode}) => {

    const [auth, setAuth] = useState<User | null>(null);

    useEffect(() => {
        const authUser = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                return;
            }

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const { data } = await axios<User>(`${import.meta.env.VITE_API_USERS_URL}/profile`, config);

                setAuth(data);
            } catch (error: any) {
                console.log(error);
            }
        };
        
        authUser();
    }, []);

    return (
        <AuthContext.Provider value={{
            auth,
            setAuth,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;