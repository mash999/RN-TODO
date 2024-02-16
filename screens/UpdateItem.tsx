import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { asyncStorageKeys } from '../constants';
import { NavigateType, TodoListTask, UpdateItemComponent } from '../types';
import TodoForm from '../components/TodoForm';
import Layout from '../components/Layout';
import { updateData } from '../store/actions/actions';


const UpdateItem = (props: UpdateItemComponent) => {
    const dispatch = useDispatch();
    const navigation = useNavigation<NavigateType>();
    const taskDetail:TodoListTask|undefined = props?.route?.params?.taskDetail;
    if(!taskDetail) return;


    const updateTaskHandler = async(formData: TodoListTask) => {
        try {
            const storedData:string|null = await AsyncStorage.getItem(asyncStorageKeys.todoList);
            if(!storedData){
                throw new Error('Cannot perform update if there\'s no data in the storage');
            }
            const updatedData: TodoListTask[] = JSON.parse(storedData).map(
                (data: TodoListTask) => {
                    if(data.id === formData.id) return formData;
                    return data;
                }
            );
            await AsyncStorage.setItem(asyncStorageKeys.todoList, JSON.stringify(updatedData));
            dispatch(updateData(updatedData));
            navigation.navigate('detail', {
                taskDetail: formData
            });
        } 
        catch (error) {
            console.log('Error storing data:', error);
        }
    };


    return (
        <Layout>
            <TodoForm 
                task={taskDetail} 
                onSubmit={updateTaskHandler}
            />
        </Layout>
    );
}


export default UpdateItem;