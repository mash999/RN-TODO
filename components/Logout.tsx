import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { NavigateType } from '../types';
import { useAuth } from '../context/AuthContext';
import colors from '../colors';


const LogoutComponent = () => {
    const navigation = useNavigation<NavigateType>();
    const { isAuthenticated, logout } = useAuth();


    useEffect(() => {
        if (!isAuthenticated) {
            navigation.replace('login');
        }
    }, [isAuthenticated, navigation]);
    
    
    const logoutHandler = async() => {
        await logout();
        navigation.replace('login');
    };
    
    
    return(  
        <Ionicons 
            name='exit-outline'
            color={colors.menuText}
            size={24}
            onPress={logoutHandler}
        />
    );
}


export default LogoutComponent;