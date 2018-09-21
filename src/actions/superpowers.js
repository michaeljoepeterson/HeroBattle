import {SubmissionError} from 'redux-form';

import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './util';

export const INITIALIZE_PAGE = "INITIALIZE_PAGE";
export const initPage = () => ({
	type:INITIALIZE_PAGE
});

export const GET_POWERS_REQUEST = "GET_POWERS_REQUEST";
export const getPowersRequest = () => ({
	type:GET_POWERS_REQUEST
});

export const GET_POWERS_SUCCESS = "GET_POWERS_SUCCESS";
export const getPowersSuccess = powers => ({
	type:GET_POWERS_SUCCESS,
	powers
});

export const GET_POWERS_ERROR = "GET_POWERS_ERROR";
export const getPowersError = error => ({
	type:GET_POWERS_ERROR,
	error
});

export const UPDATE_POINTS = "UPDATE_POINTS";
export const updatePointsAction = (currentStat,currentVal) => ({
	type:UPDATE_POINTS,
	currentStat,
	currentVal
});

export const CREATE_POWER_REQUEST = "CREATE_POWER_REQUEST";

export const createPowerRequest = () => ({
	type: CREATE_POWER_REQUEST
});

export const CREATE_POWER_SUCCESS = "CREATE_POWER_SUCCESS";

export const createPowerSuccess = () => ({
	type: CREATE_POWER_SUCCESS
});

export const CREATE_POWER_ERROR = "CREATE_POWER_ERROR";

export const createPowerError = error =>( {
	type: CREATE_POWER_ERROR,
	error
});

export const getPowers = () => (dispatch , getState) => {
	dispatch(getPowersRequest());
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
			dispatch(getPowersSuccess(data));
		})
			
		.catch(err => {
			dispatch(getPowersError(err));

			return Promise.reject(
                    new SubmissionError({
                        _error: "an error occured"
                    })
                );
		});
	
}

export const createPower = (powerData) => (dispatch , getState) => {
	dispatch(createPowerRequest());
	const authToken = getState().auth.authToken;
	return(
		fetch(`${API_BASE_URL}/superpower`, {
			method:'POST',
			headers:{
				'Content-Type': 'application/json',
				Authorization: `Bearer ${authToken}`
			},
			body:JSON.stringify({
				powerName:powerData.powerName,
				powerAttack: powerData.powerAttack,
				powerSpecial:powerData.powerSpecialAttack,
				powerDefense:powerData.powerDefence
			})
		})
		.then(res => normalizeResponseErrors(res))
		.then(res=>res.json())
		.then(res => dispatch(createPowerSuccess()))
		.catch(err=>{
			dispatch(createPowerError(err));
			let message = "an error occured";
			if(err.reason && err.reason === "ValidationError"){
				message = err.message;
			}
			return Promise.reject(
                    new SubmissionError({
                        _error: message
                    })
                );
		})

	)
}