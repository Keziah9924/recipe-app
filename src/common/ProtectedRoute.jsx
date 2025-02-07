import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { AuthToken } from '../store';

const ProtectedRoute = ({ children }) => {
    const token = useAtomValue(AuthToken);

    if (!token) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;
