import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AddItem from '../screens/AddItem';
import { asyncStorageKeys } from '../constants';
import { TodoListTask } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { insertData } from '../store/actions/actions';


jest.mock('react-redux', () => ({
    useDispatch: jest.fn()
}));


jest.mock('@react-navigation/native', () => ({
    useNavigation: jest.fn(),
}));


jest.mock('@react-native-async-storage/async-storage', () => ({
    getItem: jest.fn(),
    setItem: jest.fn()
}));


jest.spyOn(Date, 'now').mockImplementation(() => 1708138166315);


describe('Test AddItem Component', () => {
    const dispatchMock = jest.fn();
    const navigateMock = jest.fn();
    (useDispatch as unknown as jest.Mock).mockReturnValue(dispatchMock);
    (useNavigation as jest.Mock).mockReturnValue({ navigate: navigateMock });;
    
    const existingFormData: string = JSON.stringify([{
        id: 1641567363146,
        title: 'test title 1',
        description: 'test description 1',
        priority: 2,
        createdOn: 1641567363146
    }]);
    const newFormData: TodoListTask = {
        id: 1708138166315,
        title: 'test title 2',
        description: 'test description 2',
        priority: 1,
        createdOn: 1708138166315
    };
    const newData = [newFormData]
    const dataToStore = [...JSON.parse(existingFormData), ...newData];

    jest.spyOn(AsyncStorage, 'getItem').mockResolvedValue(existingFormData);
    jest.spyOn(AsyncStorage, 'setItem').mockResolvedValue();
    
    const { getByTestId } = render(<AddItem />);
    
    fireEvent.changeText(getByTestId('title-input'), newFormData.title);
    fireEvent.changeText(getByTestId('description-input'), newFormData.description);
    fireEvent.press(getByTestId('add-todo-btn'));


    it('Should handle AsyncStorage successfully when insertItemHandler is called', async () => {
        await Promise.resolve();
        expect(AsyncStorage.getItem).toHaveBeenCalledWith(asyncStorageKeys.todoList);
        expect(AsyncStorage.setItem).toHaveBeenCalledWith(
            asyncStorageKeys.todoList,
            JSON.stringify(dataToStore)
        );
    });
    

    it('Should dispatch the form data to the redux action when a new item is inserted', async () => {
        await Promise.resolve();
        expect(dispatchMock).toHaveBeenCalledWith(insertData(newFormData));
    });


    it('Should call navigate to home screen when a new item is inserted', async () => {
        await Promise.resolve();
        expect(navigateMock).toHaveBeenCalledWith('home');
    });
});
