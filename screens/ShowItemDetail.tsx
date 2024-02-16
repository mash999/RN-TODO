import React from 'react';
import { Alert, StyleSheet, Text, View  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { TodoListTask, NavigateType }  from '../types';
import { priorityFormatter } from '../helpers';
import Layout from '../components/Layout';
import Button from '../components/Button';
import colors from '../colors';
import { asyncStorageKeys } from '../constants';
import { deleteData } from '../store/actions/actions';
import { ShowItemDetailComponentProps } from '../types';
import { formatTime } from '../helpers';


const ShowItemDetail = (props: ShowItemDetailComponentProps) => {
    const dispatch = useDispatch();
    const navigation = useNavigation<NavigateType>();
    const taskDetail:TodoListTask|undefined = props?.route?.params?.taskDetail;
    
    if(!taskDetail) return;
    const priority = priorityFormatter(taskDetail.priority);
    
    
    const navigateToUpdate = () => {
        navigation.navigate('update', {
            taskDetail: taskDetail
        });
    };


    const deleteHandler = () => {
        Alert.alert(
            'Are you sure?',
            'Deleted item cannot be restored',
            [
                { text: 'Cancel' },
                { text: 'Delete', onPress: deleteTask }
            ],
            { cancelable: false }
        )
    };


    const deleteTask = async() => {
        try {
            const storedData:string|null = await AsyncStorage.getItem(asyncStorageKeys.todoList);
            if(!storedData){
                throw new Error('Cannot perform delete if there\'s no data in the storage');
            }
            const updatedData: TodoListTask[] = JSON.parse(storedData).filter((data: TodoListTask) => data.id !== taskDetail.id);
            await AsyncStorage.setItem(asyncStorageKeys.todoList, JSON.stringify(updatedData));
            dispatch(deleteData(taskDetail));
            navigation.navigate('home');
        } 
        catch (error) {
            console.log('Error storing data:', error);
        }
    };
    
    
    return (
        <Layout>
            <Text style={styles.headerText}>{taskDetail.title}</Text>
            <Text style={styles.descriptionText}>{taskDetail.description}</Text>
            
            <View style={styles.priorityContainer}>
                <Text style={styles.priorityText}>Priority: </Text>
                <Text style={{...styles.priorityText, 'color': priority?.color || '#333'}}>
                    {priority?.text}
                </Text>
            </View>
            
            <Text style={styles.createdOnText}>Created on: {formatTime(taskDetail.createdOn || null)}</Text>
            
            <View style={styles.btnContainer}>
                <Button onPress={navigateToUpdate} title="Edit" btnStyle={styles.editBtn}/>
                <Button onPress={deleteHandler} title="Delete" btnStyle={styles.deleteBtn} />
            </View>
        </Layout>
    );
}


const styles = StyleSheet.create({
    headerText: {
        color: colors.headerText,
        fontSize: 20,
        fontWeight: "500",
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: colors.borderDefault,
        paddingBottom: 15
    },
    descriptionText: {
        color: '#333',
        fontSize: 16,
        lineHeight: 25,
        marginTop: 15,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: colors.borderDefault,
        paddingBottom: 15
    },
    priorityContainer: {
        flexDirection: 'row',
        marginTop: 8
    },
    priorityText: {
        fontSize: 16,
        fontWeight: '500'
    },
    createdOnText: {
        fontSize: 16,
        fontWeight: '500',
        marginTop: 10
    },
    btnContainer: {
        flexDirection: 'row',
        marginTop: 40
    },
    editBtn: {
        backgroundColor: colors.warning,
        marginRight: 10
    },
    deleteBtn: {
        backgroundColor: colors.delete
    }
});


export default ShowItemDetail;