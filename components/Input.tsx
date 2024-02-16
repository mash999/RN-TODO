import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import colors from '../colors';
import { InputProps } from '../types';


const Input = (props: InputProps) => {
    return (
        <TextInput 
            {...props} 
            style={{...styles.input, ...props.style}} 
        />
    );
}


const styles = StyleSheet.create({
    input: {
        height: 30,
        borderBottomColor: colors.borderDefault,
        borderBottomWidth: 1
    }
});


export default Input;