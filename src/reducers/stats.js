import {
	GET_STATS_REQUEST,
	GET_STATS_SUCCESS,
	GET_STATS_ERROR,
	INITIALIZE_PAGE
} from "../actions/stats";

const initialState = {
	loading: false,
	error: null,
	message:null,
	userStats:{
		winRate:null,
		wins:null,
		matches:null,
		matchHistory:null
	}
};

export default function reducer(state = initialState,action){
	if(action.type === INITIALIZE_PAGE){
		//console.log("hero reducer called",state);
		return Object.assign({}, state, {
			userStats:{
				winRate:null,
				wins:null,
				matches:null,
				matchHistory:null
			}
        })
	}

	else if(action.type === GET_STATS_REQUEST){
		return Object.assign({}, state, {
            loading: true,
            error:null,
            userStats:{
				winRate:null,
				wins:null,
				matches:null,
				matchHistory:null
			},
            message:null
        });
	}

	else if(action.type === GET_STATS_SUCCESS){
		//console.log("reducer stats ",action.userStats)
		return Object.assign({}, state, {
			loading:false,
			userStats:action.userStats,
            error:null,
            message:"success"
        });
	}
	else if(action.type === GET_STATS_ERROR){

		return Object.assign({}, state, {
			loading:false,
            error: "an error occured",
            message:null
        });
	}

	
	return state;
}