import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigateType } from '../types';
import colors from '../colors';
import Button from './Button';
import Card from './Card';


const EmptyHome = () => {
    const navigation = useNavigation<NavigateType>();
    return (
        <View style={styles.emptyScreen}>
            <Card style={styles.cardStyle}>
                <Text style={styles.screenText}>You don't have any TODO item listed yet. Get started by adding item in your list</Text>
                <Button 
                    onPress={() => navigation.navigate('add')} 
                    title="Add New Item" 
                    btnStyle={styles.btnContainer}
                />
            </Card>
        </View>
    );
}


const styles = StyleSheet.create({
    emptyScreen: {
        height: Dimensions.get('window').height - 150,
        justifyContent: 'center'
    },
    cardStyle: {
        alignItems: 'center',
        padding: 30
    },
    screenText: {
        fontSize: 18,
        textAlign: 'center',
        lineHeight: 25,
        marginBottom: 30
    },
    btnContainer: {
        width: 200,
        backgroundColor: colors.btnDefault,
        paddingVertical: 15
    }
});


export default EmptyHome;