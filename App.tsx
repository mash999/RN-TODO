import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { AuthProvider } from './context/AuthContext';
import Navigator from './components/Navigator';
import rootReducer from './store/reducers/reducers';


const store = configureStore({
    reducer: rootReducer
});


export default function App() {
    return (
        <Provider store={store}>
            <AuthProvider>
                <Navigator />
            </AuthProvider>
        </Provider>
    );
}
