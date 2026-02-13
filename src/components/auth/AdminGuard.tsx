import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface AdminGuardProps {
    children: React.ReactNode;
}

export const AdminGuard: React.FC<AdminGuardProps> = ({ children }) => {
    const { user, isAdmin, loading } = useAuth();

    // TEMPORARY: Bypassing auth check for UI review
    return <>{children}</>;


    return <>{children}</>;
};
