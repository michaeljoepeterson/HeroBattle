import {SubmissionError} from 'redux-form';

import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './util';
export const INITIALIZE_PAGE = "INITIALIZE_PAGE";
export const initPage = () => ({
	type:INITIALIZE_PAGE
});

export const UPDATE_POINTS = "UPDATE_POINTS";
export const updatePointsAction = (currentStat,currentVal) => ({
	type:UPDATE_POINTS,
	currentStat,
	currentVal
});

export const CREATE_HERO_REQUEST = "CREATE_HERO_REQUEST";

export const createHeroRequest = () => ({
	type: CREATE_HERO_REQUEST
});

export const CREATE_HERO_SUCCESS = "CREATE_HERO_SUCCESS";

export const createHeroSuccess = () => ({
	type: CREATE_HERO_SUCCESS
});

export const CREATE_HERO_ERROR = "CREATE_HERO_ERROR";

export const createHeroError = error =>( {
	type: CREATE_HERO_ERROR,
	error
});

export const GET_HERO_REQUEST = "GET_HERO_REQUEST";

export const getHeroRequest = () => ({
	type: GET_HERO_REQUEST
});

export const GET_HERO_SUCCESS = "GET_HERO_SUCCESS";

export const getHeroSuccess = heroes => ({
	type: GET_HERO_SUCCESS,
	heroes
});

export const GET_HERO_ERROR = "GET_HERO_ERROR";

export const getHeroError = error =>( {
	type: GET_HERO_ERROR,
	error
});



export const SET_BATTLE_HERO = "SET_BATTLE_HERO";

export const setBattleHero = (hero,key) =>( {
	type: SET_BATTLE_HERO,
	hero,
	key
});
export const createHero = (heroData) => (dispatch , getState) => {
	dispatch(createHeroRequest());
	const authToken = getState().auth.authToken;
	return(
		fetch(`${API_BASE_URL}/hero`, {
			method:'POST',
			headers:{
				'Content-Type': 'application/json',
				Authorization: `Bearer ${authToken}`
			},
			body:JSON.stringify({
				heroName:heroData.heroName,
				health:heroData.heroHealth,
				maxhealth:heroData.heroHealth,
				abilityPoints:heroData.heroAbilityPoints,
				maxAbilityPoints:heroData.heroAbilityPoints,
				strength:heroData.heroStrength,
				toughness:heroData.heroToughness,
				agility:heroData.heroAgility,
				superAbility:heroData.heroSuperAbility,
				ability1:heroData.heroSuperpower1,
				ability2:heroData.heroSuperpower2,
				ability3:heroData.heroSuperpower3
			})
		})
		.then(res => normalizeResponseErrors(res))
		.then(res=>res.json())
		.then(data => dispatch(createHeroSuccess()))
		.catch(err => {
			dispatch(createHeroError(err));
			console.log("submit error",err);
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
	);

}

export const getHero = (userId) => (dispatch , getState) => {
	dispatch(getHeroRequest());
	const authToken = getState().auth.authToken;
	return(fetch(`${API_BASE_URL}/hero?userId=${userId}`,{
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
			dispatch(getHeroSuccess(data));
		})
		.catch(err => {
			dispatch(getHeroError(err));

			return Promise.reject(
                    new SubmissionError({
                        _error: "an error occured"
                    })
                )
		})
	)
}