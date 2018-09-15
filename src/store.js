import {createStore, applyMiddleware, combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form'
import thunk from 'redux-thunk';
import authReducer from './reducers/auth';
import superpowerReducer from './reducers/superpowers';

export default createStore(
    combineReducers({
        form: formReducer,
        auth: authReducer,
        superpowers:superpowerReducer
    }),applyMiddleware(thunk)
);