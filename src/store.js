import {createStore, applyMiddleware, combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form'
import thunk from 'redux-thunk';
import authReducer from './reducers/auth';
import superpowerReducer from './reducers/superpowers';
import heroReducer from './reducers/hero';
import battleReducer from './reducers/battle';
import leaderboardReducer from './reducers/leaderboard';
export default createStore(
    combineReducers({
        form: formReducer,
        auth: authReducer,
        hero:heroReducer,
        superpowers:superpowerReducer,
        battle:battleReducer,
        leaderboard:leaderboardReducer
    }),applyMiddleware(thunk)
);