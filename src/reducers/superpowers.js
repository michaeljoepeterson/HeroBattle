import {
	GET_POWERS_REQUEST,
	GET_POWERS_SUCCESS,
	GET_POWERS_ERROR
} from "../actions/superpowers";

const initialState = {
	loading: false,
	powers:null,
	error: null,
	powerNames:null,
	currentPower:{
		availablePoints: "100",
		powerAttack:"0",
		powerDefense:"0",
		powerSpecialAttack:"0",
	}
};

export default function reducer(state = initialState,action){
	if(action.type === GET_POWERS_REQUEST){
		console.log("get powers request");
		return Object.assign({}, state, {
            loading: true,
            error:null
        });
	}

	else if(action.type === GET_POWERS_SUCCESS){
		console.log("action powers", action.powers);
		let powerNamesArr = [];
		for(let i =0;i < action.powers.length;i++){
			//console.log("reducer for loop",action.powers[i].powerName);
			powerNamesArr.push(action.powers[i].powerName);
		}
		//console.log("powers name arr in action",powerNamesArr);
		return Object.assign({}, state, {
			loading:false,
            powers: action.powers,
            powerNames:powerNamesArr,
            error:null
        });
	}
	else if(action.type === GET_POWERS_ERROR){
		console.log("super power error");
		return Object.assign({}, state, {
			loading:false,
            error: action.error
        });
	}
	return state;
}