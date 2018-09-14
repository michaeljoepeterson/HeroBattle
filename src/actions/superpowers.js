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
export const getPowersSuccess = error => {
	type:GET_POWERS_ERROR,
	error
}

export const getPowers = () => dispatch => {
	dispatch(getPowersRequest);
	return(
		fetch(`${API_BASE_URL}/api/superpower`, {
			
		})
	);
}