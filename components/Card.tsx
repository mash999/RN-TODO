import React from 'react';
import { StyleSheet, View } from 'react-native';
import colors from '../colors';
import { CardComponentProps } from '../types';


const Card = (props: CardComponentProps) => {
    return (
        <View style={{...styles.card, ...props.style}}>
            {props.children}
        </View>
    );
}


const styles = StyleSheet.create({
    card: {
        elevation: 2,
        borderColor: colors.borderDefault,
        marginVertical: 5,
        padding: 15,
        shadowOpacity: 0.9,
        shadowColor: colors.shadowDefault,
        shadowOffset: { width: 2, height: 3 }
    }
});


export default Card;