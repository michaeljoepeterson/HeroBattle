import {
	INITIALIZE_PAGE
} from '../actions/hero';

const initialState = {
	init:{
		heroHealth:"100",
		heroAbilityPoints:"100",
		heroStrength:"50",
		heroToughness:"50",
		heroAgility:"50",
		heroSuperAbility:"50"
	}
};

export default function reducer(state = initialState,action){
	if(action.type === INITIALIZE_PAGE){
		console.log("hero reducer called",state);
		return state;
	}

	return state;
}