import React from 'react';
import { TextInputProps, ViewStyle } from 'react-native';

type navigateParamsType = (routeName: string, params?: Object) => void;


export interface Action {
    type: string;
    payload: any;
}


export interface AppState {
    listItems: TodoListTask[];
}


export interface AuthContextType {
    isAuthenticated: boolean;
    login: () => Promise<void>;
    logout: () => Promise<void>;
}


export interface ButtonComponentProps {
    title: string;
    onPress: () => void;
    btnStyle?: Object;
    btnTextStyle?: Object;
    testID?: string;
}


export interface CardComponentProps {
    style?: Object;
    children?: React.ReactNode;
}


export interface InputProps extends TextInputProps {
    style?: ViewStyle;
}


export interface LayoutComponentProps {
    children?: React.ReactNode;
}


export interface ListItemComponentProps {
    task: TodoListTask;
    onPress: (task: TodoListTask) => void;
}


export interface NavigateType {
    navigate: navigateParamsType;
    replace: (routeName: string, params?: Object) => void;
}


export interface RadioComponentProps {
    title: string;
    value: number;
    onSelect: (value: number) => void;
    isSelected?: boolean;
}


export interface ShowItemDetailComponentProps {
    route?: {
        params: {
            taskDetail: TodoListTask
        }
    }
}


export interface SnackbarComponentProps {
    optionText: string;
    text: string;
    onDismiss: () => void;
    snackbarStyle?: Object;
    textStyle?: Object;
}


export interface StackNavigationOptions {
    route: { 
        name: string;
    };
    navigation: {
        navigate: navigateParamsType;
    };
};


export interface TodoListTask {
    id: number;
    title: string;
    description: string;
    priority: number;
    createdOn?: number;
};


export interface UpdateItemComponent {
    route?: {
        params: {
            taskDetail: TodoListTask
        }
    }
}