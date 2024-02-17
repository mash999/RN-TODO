import React, { useState } from 'react';
import { Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';
import Radio from '../components/Radio';
import colors from '../colors';
import { priorityLevels } from '../constants';
import { TodoListTask } from '../types';
import { isEmpty } from '../helpers';
import Snackbar from './Snackbar';


const TodoForm = (props: {onSubmit: (formData: TodoListTask) => void, task?: TodoListTask}) => {
    const [errorMessage, setErrorMessage] = useState('');
    const [formData, setFormData] = useState({
        id: props.task?.id || Date.now(),
        title: props.task?.title || '',
        description: props.task?.description || '',
        priority: props.task?.priority || priorityLevels.low.value,
        createdOn: props.task?.createdOn || Date.now()
    });


    const updateTitle = (title: string) => {
        setFormData({ ...formData, title: title });
    };


    const updateDescription = (description: string) => {
        setFormData({ ...formData, description: description });
    };


    const updatePriority = (priorityValue: number) => {
        setFormData({ ...formData, priority: priorityValue });
    };


    const submitFormData = () => {
        if(isEmpty(formData.title) || isEmpty(formData.description) || !formData.priority){
            setErrorMessage('One or more required field is empty');
            return;
        }
        props.onSubmit(formData);
    };

    
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View>
                <Text style={styles.headerText}>
                    { 
                        props.task
                            ? 'Edit TODO'
                            : 'What would you like to add to the list?' 
                    } 
                </Text>

                <Card>
                    <Text style={styles.labelText}>Title: *</Text>
                    <Input 
                        placeholder="Please enter a title ..." 
                        value={formData.title} 
                        testID='title-input'
                        onChangeText={updateTitle}
                    />
                </Card>
                
                <Card>
                    <Text style={styles.labelText}>Description: *</Text>
                    <Input 
                        placeholder="Add a description ..." 
                        multiline={true}
                        textAlignVertical="top"
                        value={formData.description} 
                        style={styles.textBox}
                        testID='description-input'
                        onChangeText={updateDescription}
                    />
                </Card>
                
                <Card>
                    <Text style={styles.labelText}>Priority: *</Text>
                    {
                        Object.values(priorityLevels).map((priority, index) => {
                            return (
                                <Radio 
                                    key={index}
                                    isSelected={priority.value === formData.priority}
                                    value={priority.value} 
                                    title={priority.text} 
                                    onSelect={updatePriority}
                                />
                            )
                        })
                    }
                </Card>

                <Button 
                    onPress={submitFormData} 
                    btnStyle={styles.btn}
                    testID="add-todo-btn"
                    title={ props.task ? 'Update' : 'Save' }
                />

                { !isEmpty(errorMessage) ? 
                    <Snackbar 
                        text={errorMessage}
                        optionText='Ok!'
                        onDismiss = {() => setErrorMessage('')}
                    />
                    : null 
                }
            </View>
        </TouchableWithoutFeedback>
    );
}


const styles = StyleSheet.create({
    headerText: {
        color: colors.headerText,
        fontSize: 20,
        marginVertical: 15,
        textAlign: 'center',
        fontWeight: '500',
        borderBottomWidth: 1,
        borderBottomColor: colors.borderDefault,
        paddingBottom: 15
    },
    labelText: {
        color: colors.headerText,
        fontSize: 17,
        fontWeight: "500",
        marginBottom: 10
    },
    textBox: {
        height: 100,
        borderWidth: 1,
        borderColor: colors.borderDefault,
        padding: 10,
        lineHeight: 20
    },
    btn: {
        marginTop: 20,
        backgroundColor: colors.success
    }
});


export default TodoForm;