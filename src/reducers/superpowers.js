import {
	GET_POWERS_REQUEST,
	GET_POWERS_SUCCESS,
	GET_POWERS_ERROR
} from "../actions/superpowers";

const initialState = {
	loading: false,
	powers:null
};

export default function reducer(state = initialState,action){
	if(action.type === GET_POWERS_REQUEST){
		return Object.assign({}, state, {
            loading: true
        });
	}

	if(action.type === GET_POWERS_SUCCESS){
		return Object.assign({}, state, {
            powers: action.powers
        });
	}
}