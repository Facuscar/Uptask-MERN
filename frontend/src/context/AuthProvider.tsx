import { useState, useEffect, createContext } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    return (
        <AuthContext.Provider value={{
            
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;