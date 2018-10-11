import {SubmissionError} from 'redux-form';

import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './util';

export const registerUser = user => dispatch => {
    return fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .catch(err => {
            let message = "an error occured";
            if(err.reason && err.reason === "ValidationError"){
                    message = err.message;
                }

                return Promise.reject(
                    new SubmissionError({
                        _error: message
                    })
                );

        });
};
