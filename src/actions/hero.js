import {SubmissionError} from 'redux-form';

import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './util';
export const INITIALIZE_PAGE = "INITIALIZE_PAGE";
export const initPage = () => ({
	type:INITIALIZE_PAGE
});

export const UPDATE_POINTS = "UPDATE_POINTS";
export const updatePointsAction = (currentHero,availablePoints) => ({
	type:UPDATE_POINTS,
	currentHero,
	availablePoints
});