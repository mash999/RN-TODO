import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../colors';
import Button from './Button';
import { SnackbarComponentProps } from '../types';


const Snackbar = (props: SnackbarComponentProps) => {
    return (
        <View>
            <View style={{...styles.snackbar, ...props.snackbarStyle}}>
                <Text style={{...styles.snackbarText, ...props.textStyle}}>{props.text}</Text>
                <Button 
                    btnStyle={styles.btn}
                    btnTextStyle={styles.btnText}
                    onPress={props.onDismiss}
                    title={props.optionText}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    snackbar: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        backgroundColor: colors.snackbarBackground,
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 5,
        zIndex: 9
    },
    snackbarText: {
        color: colors.snackbarText,
        fontSize: 14,
        lineHeight: 20
    },
    btn: {
        width: 80,
        color: colors.snackbarBtn,
        backgroundColor: colors.snackbarBtn,
        marginLeft: 10,
        borderRadius: 5
    },
    btnText: {
        color: colors.snackbarBtnText,
        fontSize: 14
    }
});


export default Snackbar;