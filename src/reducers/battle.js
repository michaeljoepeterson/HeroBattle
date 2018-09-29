import {
	GET_OPPONENT_REQUEST,
	GET_OPPONENT_SUCCESS,
	GET_OPPONENT_ERROR,
} from '../actions/battle';

const initialState = {
	opponent:null,
	results:null,
	loading:null,
	error:null,
	message:null
};

export default function reducer(state = initialState,action){
	if(action.type === GET_OPPONENT_REQUEST){
		return Object.assign({}, state, {
			loading:true,
			error:null,
			message:null
        });
	}

	else if(action.type === GET_OPPONENT_SUCCESS){
		return Object.assign({}, state, {
			loading:null,
			opponent:action.opponentHero,
			message:null
        });
	}

	else if(action.type === GET_OPPONENT_ERROR){
		return Object.assign({}, state, {
			loading:null,
			error:action.error,
			message:null
        });
	}

	return state;
}