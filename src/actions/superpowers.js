import {SubmissionError} from 'redux-form';

import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './util';

export const GET_POWERS_REQUEST = "GET_POWERS_REQUEST";
export const getPowersRequest = () => {
	type:GET_POWERS_REQUEST
}

export const GET_POWERS_SUCCESS = "GET_POWERS_SUCCESS";
export const getPowersSuccess = powers => {
	type:GET_POWERS_SUCCESS,
	powers
}

export const GET_POWERS_ERROR = "GET_POWERS_ERROR";
export const getPowersError = error => {
	type:GET_POWERS_ERROR,
	error
}

export const getPowers = () => (dispatch , getState) => {
	dispatch(getPowersRequest);
	const authToken = getState().auth.authToken;
	return fetch(`${API_BASE_URL}/superpower`, {
			method:"GET",
			headers: {
            
            Authorization: `Bearer ${authToken}`
        	}
		})
		.then(
			res => {
				return normalizeResponseErrors(res)
				
			}
		)
		.then(res => {
			//console.log(res);
			return res.json()
		})
		.then(data => {
			console.log("Before dispatch");
			console.log(data);
			dispatch(getPowersSuccess(data))
		})
			
		.catch(err => {
			//dispatch(getPowersError(err));
		});
	
}