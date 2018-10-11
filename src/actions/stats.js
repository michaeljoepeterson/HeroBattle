import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './util';

export const INITIALIZE_PAGE = "INITIALIZE_PAGE";
export const initPage = () => ({
	type:INITIALIZE_PAGE
});

export const GET_STATS_REQUEST = "GET_STATS_REQUEST";
export const getStatsRequest = () => ({
	type:GET_STATS_REQUEST
});

export const GET_STATS_SUCCESS = "GET_STATS_SUCCESS";
export const getStatsSuccess = userStats => ({
	type:GET_STATS_SUCCESS,
	userStats
});

export const GET_STATS_ERROR = "GET_STATS_ERROR";
export const getStatsError = error => ({
	type:GET_STATS_ERROR,
	error
});

export const getStats = (username) => (dispatch , getState) => {
	dispatch(getStatsRequest());
	const authToken = getState().auth.authToken;
	return fetch(`${API_BASE_URL}/users/stats?username=${username}`, {
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
			return res.json()
		})
		.then(data => {
			dispatch(getStatsSuccess(data));
		})
		.catch(err => {
			dispatch(getStatsError(err));
		})
}