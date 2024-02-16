import React, { useState, useEffect } from 'react';
import { Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigateType } from '../types';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';
import colors from '../colors';
import { credentials } from '../constants';
import Snackbar from '../components/Snackbar';


const LoginScreen = () => {
    const navigation = useNavigation<NavigateType>();
    const { isAuthenticated, login } = useAuth();
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(false);


    useEffect(() => {
        if (isAuthenticated) {
            navigation.replace('home');
        }
    }, [isAuthenticated, navigation]);


    const usernameHandler = (username: string) => {
        setUserName(username);
    };


    const passwordHandler = (password: string) => {
        setPassword(password);
    };


    const loginHandler = async() => {
        if(username.toLowerCase() === credentials.username && password.toLowerCase() === credentials.password){
            await login();
            navigation.replace('home');
            return;
        }
        setLoginError(true);
    };
    
    if(isAuthenticated) return null;

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.loginScreen}>
                <Card style={styles.card}>
                    <View style={styles.loginInfo}>
                        <Text style={styles.headerText}>Please sign in with the following credentials:</Text>
                        <Text style={styles.credentialText}>Username: {credentials.username}</Text>
                        <Text style={styles.credentialText}>Password: {credentials.password}</Text>
                    </View>

                    <View>
                        <Text style={styles.labelText}>Username: *</Text>
                        <Input 
                            placeholder={`Type '${credentials.username}' in this box`}
                            onChangeText={usernameHandler}
                            style={styles.input}
                        />
                    </View>

                    <View>
                        <Text style={styles.labelText}>Password: *</Text>
                        <Input 
                            placeholder={`Type '${credentials.password}' in this box`}
                            secureTextEntry={true}
                            onChangeText={passwordHandler}
                            style={styles.input}
                        />
                    </View>

                    <Button 
                        onPress={loginHandler} 
                        btnStyle={styles.btn}
                        title="Submit"
                    />
                </Card>
            

                { loginError ? 
                    <Snackbar 
                        text = "Your credentials could not be matched."
                        optionText = 'Try Again!'
                        onDismiss = {() => setLoginError(false)}
                        snackbarStyle={styles.snackbar}
                    />
                    : null 
                }
            </View>
        </TouchableWithoutFeedback>
    );
}


const styles = StyleSheet.create({
    loginScreen: {
        width: '100%',
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    card: {
        width: 360,
        padding: 30,
    },
    loginInfo: {
        marginBottom: 30,
        paddingBottom: 10,
        borderBottomColor: colors.borderDeep,
        borderBottomWidth: 1
    },
    headerText: {
        color: colors.headerText,
        fontSize: 20,
        lineHeight: 30,
        marginVertical: 15,
        textAlign: 'center',
        fontWeight: '500'
    },
    credentialText: {
        textAlign: 'center',
        fontWeight: '500',
        fontSize: 15
    },
    labelText: {
        color: colors.headerText,
        fontSize: 17,
        fontWeight: "500",
        marginBottom: 5
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: colors.borderDeep,
        paddingHorizontal: 10,
        marginBottom: 15
    },
    btn: {
        marginTop: 20,
        backgroundColor: colors.btnDefault
    },
    snackbar: {
        position: 'relative',
        marginTop: 30
    }
});


export default LoginScreen;