import {createStore, applyMiddleware, combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form'
import thunk from 'redux-thunk';
import authReducer from './reducers/auth';
import superpowerReducer from './reducers/superpowers';
import heroReducer from './reducers/hero';
import battleReducer from './reducers/battle';
import leaderboardReducer from './reducers/leaderboard';
import statsReducer from './reducers/stats';
export default createStore(
    combineReducers({
        form: formReducer,
        auth: authReducer,
        hero:heroReducer,
        superpowers:superpowerReducer,
        battle:battleReducer,
        stats:statsReducer,
        leaderboard:leaderboardReducer
    }),applyMiddleware(thunk)
);