import {
	GET_POWERS_REQUEST,
	GET_POWERS_SUCCESS,
	GET_POWERS_ERROR
} from "../actions/superpowers";

const initialState = {
	loading: false,
	powers:null,
	error: null
};

export default function reducer(state = initialState,action){
	if(action.type === GET_POWERS_REQUEST){
		return Object.assign({}, state, {
            loading: true
        });
	}

	else if(action.type === GET_POWERS_SUCCESS){
		return Object.assign({}, state, {
			loading:false,
            powers: action.powers
        });
	}
	else if(action.type === GET_POWERS_ERROR){
		return Object.assign({}, state, {
			loading:false,
            error: action.error
        });
	}
}