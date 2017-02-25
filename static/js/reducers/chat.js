import { combineReducers } from 'redux';
import {
    SUBMIT_MESSAGE,
    TYPE_MESSAGE,
    RECIEVE_MESSAGE
} from './../constants.js'

const message = (state = { name: '', msg: '' }, action) => {
    switch (action.type) {
        case SUBMIT_MESSAGE:
            return Object.asign({}, state);
        default:
            return state;
    }
};

const preview = (state = { name: '', msg: '' }, action) => {
    switch (action.type) {
        case TYPE_MESSAGE:
            return Object.asign({}, state);
        default:
            return state;
    }
};

const chatReducer = combineReducers({
    message: message,
    preview: preview
});

export default chatReducer;
