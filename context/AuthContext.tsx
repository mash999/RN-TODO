import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContextType } from '../types';
import { asyncStorageKeys } from '../constants';


const AuthContext = createContext<AuthContextType|null>(null);


export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};


export const AuthProvider = (props: React.PropsWithChildren) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);


    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const authenticationStatus = await AsyncStorage.getItem(asyncStorageKeys.isAuthenticated);
                if (authenticationStatus) {
                    setIsAuthenticated(true);
                }
            } catch (error) {
                console.error('Error reading isAuthenticated flag from AsyncStorage: ', error);
            }
        };
        checkAuthentication();
    }, []);


    const login = async () => {
        try {
            await AsyncStorage.setItem(asyncStorageKeys.isAuthenticated, 'true');
            setIsAuthenticated(true);
        } catch (error) {
            console.error('Error during login: ', error);
        }
    };


    const logout = async () => {
        try {
            await AsyncStorage.removeItem(asyncStorageKeys.isAuthenticated);
            setIsAuthenticated(false);
        } catch (error) {
            console.error('Error during logout: ', error);
        }
    };

  
    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                login,
                logout,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};
