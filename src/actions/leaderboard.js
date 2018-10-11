import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './util';

export const INITIALIZE_PAGE = "INITIALIZE_PAGE";
export const initPage = () => ({
	type:INITIALIZE_PAGE
});

export const GET_LEADERBOARD_REQUEST = "GET_LEADERBOARD_REQUEST";
export const getLeaderboardRequest = () => ({
	type:GET_LEADERBOARD_REQUEST
});

export const GET_LEADERBOARD_SUCCESS = "GET_LEADERBOARD_SUCCESS";
export const getLeaderboardSuccess = scores => ({
	type:GET_LEADERBOARD_SUCCESS,
	scores
});

export const GET_LEADERBOARD_ERROR = "GET_LEADERBOARD_ERROR";
export const getLeaderboardError = error => ({
	type:GET_LEADERBOARD_ERROR,
	error
});

export const getLeaderboard = () => (dispatch , getState) => {
	dispatch(getLeaderboardRequest());
	const authToken = getState().auth.authToken;
	return fetch(`${API_BASE_URL}/leaderboard`, {
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
			dispatch(getLeaderboardSuccess(data));
		})
		.catch(err => {
			dispatch(getLeaderboardError(err));
		})
}