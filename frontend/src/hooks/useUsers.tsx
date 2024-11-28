"use client";

import { UserModel, userService } from '@/services/user';
import { createContext, useContext, ReactNode, useState } from 'react';

interface UserContextType {
    userData: UserModel | null;
    get: (id: string, undecodedToken: string) => Promise<void>;
    update: (id: string, userData: UserModel, undecodedToken: string) => Promise<void>;
};

interface UserProviderProps {
    children: ReactNode;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: UserProviderProps) => {

    const [userData, setUserData] = useState<UserModel | null>(null);

    const get = async (id: string, undecodedToken: string) => {
        try {
            const res = await userService.getUserById(id, undecodedToken);
            setUserData(res);
        } catch (err) {
            console.error('Error fetching user:', err);
            setUserData(null);
            throw err;
        }
    };

    const update = async (id: string, userData: UserModel, undecodedToken: string) => {
        try {
            await userService.update(id, userData, undecodedToken);
            setUserData(userData);
        } catch (err) {
            console.error('Error updating user:', err);
            setUserData(null);
            throw err;
        }
    };

    const value: UserContextType = {
        userData,
        get,
        update
    };

    return (
        <UserContext.Provider value={value} >
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within an UserProvider");
    }
    return context;
};