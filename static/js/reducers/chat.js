import combineReducers from 'redux';

const message = (state = { name: '', msg: '' }, action) => {
    return {...state, ...action.payload};
};

const preview (state = { name: '', msg: '' }, action) => {
    return {...state, ...action.payload};
};

const messages = (satte = [], action) => {
    return state;
};

const chatReducer = combineReducers ({
    messages: messages,
    preview: preview
});

export default chatReducer;
