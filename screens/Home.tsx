import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppState, NavigateType, TodoListTask }  from '../types';
import Layout from '../components/Layout';
import ListItem from '../components/ListItem';
import EmptyHome from '../components/EmptyHome';
import { asyncStorageKeys } from '../constants';
import { setStore } from '../store/actions/actions';
import { formatTime } from '../helpers';
import colors from '../colors';


const Home = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation<NavigateType>();
    const todoList = useSelector((state: AppState) => state?.listItems);
    

    useEffect(() => {
        retrieveData();
    }, []);
        
    
    const retrieveData = async() => {
        try {
            const storedData = await AsyncStorage.getItem(asyncStorageKeys.todoList);
            if (storedData !== null) {
                console.log("Data in async storage: ", storedData);
                const sortedData = JSON.parse(storedData).reverse() 
                dispatch(setStore(sortedData));
            }
        } catch (error) {
            console.log('Error retrieving data:', error);
        }
    };

    
    const navigateAway = (task: TodoListTask) => {
        navigation.navigate('detail', {
            taskDetail: task
        });
    };

    
    return (
        <Layout>
            <Text style={styles.header}>Your Tasks</Text>
            <Text style={styles.date}>Today is {formatTime(Date.now())}</Text>

            { todoList?.length > 0
                ? todoList.map((task: TodoListTask, index: number) => 
                    <ListItem
                        key={index} 
                        task={task} 
                        onPress={navigateAway}
                    />
                )
                : <EmptyHome />
            }
        </Layout> 
    )
}


const styles = StyleSheet.create({
    header: {
        fontSize: 24,
        fontWeight: '500',
        color: colors.headerText,
        marginTop: 15,
        marginBottom: 5
    },
    date: {
        marginBottom: 20,
        color: colors.bodyText
    }
});


export default Home;