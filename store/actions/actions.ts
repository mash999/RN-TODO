import { FETCH_DATA, INSERT_DATA, UPDATE_DATA, DELETE_DATA } from './actionTypes';
import { TodoListTask } from '../../types';


export const setStore = (retrievedData: TodoListTask[]) => ({
    type: FETCH_DATA,
    payload: retrievedData
});


export const insertData = (newData: TodoListTask) => ({
    type: INSERT_DATA,
    payload: newData
});


export const updateData = (updatedData: TodoListTask[]) => ({
    type: UPDATE_DATA,
    payload: updatedData
});


export const deleteData = (task: TodoListTask) => ({
    type: DELETE_DATA,
    payload: task
});