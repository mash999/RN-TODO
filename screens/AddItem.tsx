import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { NavigateType, TodoListTask } from '../types';
import { asyncStorageKeys } from '../constants';
import TodoForm from '../components/TodoForm';
import Layout from '../components/Layout';
import { insertData } from '../store/actions/actions';


const AddItem = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation<NavigateType>();
    

    const insertItemHandler = async(formData: TodoListTask) => {
        try {
            let newData = [formData];
            const storedData = await AsyncStorage.getItem(asyncStorageKeys.todoList);
            if(storedData){
                newData = [
                    ...JSON.parse(storedData), 
                    ...newData
                ];
            }
            await AsyncStorage.setItem(asyncStorageKeys.todoList, JSON.stringify(newData));
        } catch (error) {
            console.log('Error storing data:', error);
        }
        
        dispatch(insertData(formData));
        navigation.navigate('home');
    };

    
    return (
        <Layout>
            <TodoForm onSubmit={insertItemHandler}/>
        </Layout>
    );
}


export default AddItem;