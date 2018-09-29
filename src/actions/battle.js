import {SubmissionError} from 'redux-form';

import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './util';

export const INITIALIZE = "INITIALIZE";

export const initPageBattle = () => ({
	type: INITIALIZE
});

export const GET_OPPONENT_REQUEST = "GET_OPPONENT_REQUEST";

export const getOpponentRequest = () => ({
	type: GET_OPPONENT_REQUEST
});

export const GET_OPPONENT_SUCCESS = "GET_OPPONENT_SUCCESS";

export const getOpponentSuccess = opponentHero => ({
	type: GET_OPPONENT_SUCCESS,
	opponentHero
});

export const GET_OPPONENT_ERROR = "GET_OPPONENT_ERROR";

export const getOpponentError = error =>( {
	type: GET_OPPONENT_ERROR,
	error
});

export const getOpponent =(username)=>(dispatch,getState)=>{
	dispatch(getOpponentRequest());
	const authToken = getState().auth.authToken;
	return(fetch(`${API_BASE_URL}/battle/findmatch?username=${username}`,{
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
			dispatch(getOpponentSuccess(data));
		})
		.catch(err => {
			dispatch(getOpponentError(err));

			return Promise.reject(
                    new SubmissionError({
                        _error: "an error occured"
                    })
                )
		})
	)
}