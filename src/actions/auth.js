import jwtDecode from 'jwt-decode';
import {SubmissionError} from 'redux-form';

import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './util';

import {saveAuthToken, clearAuthToken} from '../local-storage';
//action used to set the auth token
export const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN';
export const setAuthToken = authToken => ({
    type: SET_AUTH_TOKEN,
    authToken
});
//clear the auth token
export const CLEAR_AUTH = 'CLEAR_AUTH';
export const clearAuth = () => ({
    type: CLEAR_AUTH
});
//initialize the auth request, this is to help deal with the loading state
export const AUTH_REQUEST = 'AUTH_REQUEST';
export const authRequest = () => ({
    type: AUTH_REQUEST
});
//action dealing with the successful api call
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const authSuccess = currentUser => ({
    type: AUTH_SUCCESS,
    currentUser
});
//action that deals with errors from teh api
export const AUTH_ERROR = 'AUTH_ERROR';
export const authError = error => ({
    type: AUTH_ERROR,
    error
});

const storeAuthInfo = (authToken, dispatch) => {
    //decoded with a library
    const decodedToken = jwtDecode(authToken);
    //these two are continued in the reducer
    //this will store the auth token in our state
    dispatch(setAuthToken(authToken));
    //this will set the current user as the user taht just logged in in the state
    dispatch(authSuccess(decodedToken.user));
    //saving the auth token in our local storage
    saveAuthToken(authToken);
};

export const login = (username, password) => dispatch => {
    //this is part of the request success and error pattern
    //this one will set loading
    dispatch(authRequest());
    console.log("making request");
    return (
        fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        })
            .then(res => normalizeResponseErrors(res))
            .then(res => res.json())
            .then(({authToken}) => storeAuthInfo(authToken, dispatch))
            .catch(err => {
                const {code} = err;
                const message =
                    code === 401
                        ? 'Incorrect username or password'
                        : 'Unable to login, please try again';
                dispatch(authError(err));
                // Could not authenticate, so return a SubmissionError for Redux
                return Promise.reject(
                    new SubmissionError({
                        _error: message
                    })
                );
            })
    );
};