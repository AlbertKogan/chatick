import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import chatReducer from './../reducers/chat.js'

const loggerMiddleware = createLogger()

export default function configureStore (preloadedState) {
    return createStore(
        chatReducer,
        preloadedState,
        applyMiddleware(
            thunkMiddleware,
            loggerMiddleware
        )
    )
}
