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
		return Object.assign({}, state, {
			scores:null
        })
	}

	else if(action.type === GET_LEADERBOARD_REQUEST){

		return Object.assign({}, state, {
            loading: true,
            error:null,
            message:null,
            scores:null
        });
	}

	else if(action.type === GET_LEADERBOARD_SUCCESS){
		return Object.assign({}, state, {
			loading:false,
			scores:action.scores,
            error:null,
            message:"success"
        });
	}
	else if(action.type === GET_LEADERBOARD_ERROR){
		return Object.assign({}, state, {
			loading:false,
            error: "an error occured",
            scores:null
        });
	}

	
	return state;
}