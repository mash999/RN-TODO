import { DELETE_DATA, FETCH_DATA, INSERT_DATA, UPDATE_DATA } from '../actions/actionTypes';
import { AppState, Action } from '../../types';


const initialState: AppState = {
    listItems: []
};


const rootReducer = (state: AppState = initialState, action: Action): AppState => {
    const { type, payload } = action;
    switch (type) {
        case FETCH_DATA: {
            return {
                ...state,
                listItems: payload
            }
        }
        case INSERT_DATA: {
            return {
                ...state,
                listItems: [
                    ...state.listItems,
                    payload
                ]
            }
        }
        case UPDATE_DATA: {
            return {
                ...state,
                listItems: payload,
            }
        }
        case DELETE_DATA: {
            return {
                ...state,
                listItems: state.listItems.filter(item => item.id !== payload.id)
            }
        }
        default: return state;
    }
};

export default rootReducer;