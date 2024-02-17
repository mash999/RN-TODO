import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import colors from '../colors';
import { ButtonComponentProps } from '../types';


const Button = (props: ButtonComponentProps) => {
    return (
        <TouchableOpacity 
            {...props}
            style={{...styles.btn, ...props.btnStyle}} 
            onPress={props.onPress}
        >
            <Text style={{...styles.btnText, ...props.btnTextStyle}}>{props.title}</Text>
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
    btn: {
        width: 100,
        backgroundColor: colors.btnDefault,
        paddingVertical: 8,
        borderRadius: 8
    },
    btnText: {
        color: colors.btnDefaultText,
        textAlign: 'center',
        fontSize: 16
    }
})

export default Button;