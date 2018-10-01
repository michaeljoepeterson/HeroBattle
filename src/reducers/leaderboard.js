import {
	GET_LEADERBOARD_REQUEST,
	GET_LEADERBOARD_SUCCESS,
	GET_LEADERBOARD_ERROR,
	INITIALIZE_PAGE
} from "../actions/leaderboard";

const initialState = {
	loading: false,
	error: null,
	message:null,
	scores:null
};

export default function reducer(state = initialState,action){
	if(action.type === INITIALIZE_PAGE){
		//console.log("hero reducer called",state);
		return Object.assign({}, state, {
			scores:null
        })
	}

	else if(action.type === GET_LEADERBOARD_REQUEST){
		console.log("get leaderboard request");
		return Object.assign({}, state, {
            loading: true,
            error:null
        });
	}

	else if(action.type === GET_LEADERBOARD_SUCCESS){
		console.log("action leaderboard", action.powers);
		//console.log("powers name arr in action",powerNamesArr);
		return Object.assign({}, state, {
			loading:false,
			scores:action.scores,
            error:null,
            message:"success"
        });
	}
	else if(action.type === GET_LEADERBOARD_ERROR){
		console.log("leaderboard error");
		return Object.assign({}, state, {
			loading:false,
            error: action.error
        });
	}

	
	return state;
}