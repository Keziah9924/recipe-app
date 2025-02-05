// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Check if the user is authenticated (e.g., by checking localStorage for a token)
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Optionally, validate the token on the server
            setUser({ token });
        }
    }, []);

    // Login function
    const login = (token) => {
        localStorage.setItem('token', token);
        setUser({ token });
    };

    // Logout function
    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };
console.log(user)
    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);