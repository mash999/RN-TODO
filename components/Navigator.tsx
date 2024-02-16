import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import Home from '../screens/Home';
import AddItem from '../screens/AddItem';
import ShowItemDetail from '../screens/ShowItemDetail';
import UpdateItem from '../screens/UpdateItem';
import colors from '../colors';
import LogoutComponent from '../components/Logout';
import { useAuth } from '../context/AuthContext';
import { StackNavigationOptions } from '../types';


const stack = createNativeStackNavigator();
const defaultNavigationOptions = ({ route, navigation }: StackNavigationOptions) => ({
    headerTitleStyle: {
        fontSize: 18
    },
    headerStyle: {
        backgroundColor: colors.menuBackground
    },
    headerTintColor: colors.menuText,
    headerRight: () => {
        if(route.name !== 'login'){
            return (
                <>
                    <Ionicons 
                        name={route.name === 'home' ? 'home' : 'home-outline'}
                        color={colors.menuText}
                        size={24}
                        onPress={() => navigation.navigate('home')}
                        style={{marginRight: 20}}
                    />
                    <Ionicons 
                        name={route.name === 'add' ? 'create' : 'create-outline'}
                        color={colors.menuText}
                        size={24}
                        onPress={() => navigation.navigate('add')}
                        style={{marginRight: 20}}
                    />
                    <LogoutComponent />
                </>
            );
        }
    }
});


const Navigator = () => {
    const { isAuthenticated } = useAuth();
    return (
        <NavigationContainer>
            <stack.Navigator 
                initialRouteName="login"
                screenOptions={defaultNavigationOptions}
            >
                {
                    isAuthenticated ? 
                    <>
                        <stack.Screen name="home" component={Home} options={{headerTitle: 'My TODO List'}} />
                        <stack.Screen name="add" component={AddItem} options={{headerTitle: 'Add New TODO'}} />
                        <stack.Screen name="detail" component={ShowItemDetail} options={{headerTitle: 'Detail'}} />
                        <stack.Screen name="update" component={UpdateItem} options={{headerTitle: 'Update My TODO'}} />
                    </>
                    : <stack.Screen name="login" component={LoginScreen} options={{headerTitle: 'Please Login to Continue'}} />
                }
            </stack.Navigator>
        </NavigationContainer>
    );
}


export default Navigator;