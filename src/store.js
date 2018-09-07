import {createStore, applyMiddleware, combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form'
import thunk from 'redux-thunk';
import authReducer from './reducers/auth';
export default createStore(
    combineReducers({
        form: formReducer,
        auth: authReducer
    }),applyMiddleware(thunk)
);