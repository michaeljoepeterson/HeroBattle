import {
	GET_POWERS_REQUEST,
	GET_POWERS_SUCCESS,
	GET_POWERS_ERROR,
	UPDATE_POINTS,
	INITIALIZE_PAGE,
	CREATE_POWER_REQUEST,
	CREATE_POWER_SUCCESS,
	CREATE_POWER_ERROR
} from "../actions/superpowers";

const initialState = {
	loading: false,
	powers:null,
	error: null,
	message:null,
	powerNames:null,
	currentPower:{
		availablePoints: "100",
		powerAttack:"0",
		powerDefence:"0",
		powerSpecialAttack:"0",
	}
};

export default function reducer(state = initialState,action){
	if(action.type === INITIALIZE_PAGE){
		//console.log("hero reducer called",state);
		return Object.assign({}, state, {
			currentPower:{
			availablePoints: "100",
			powerAttack:"0",
			powerDefence:"0",
			powerSpecialAttack:"0",
		}
        })
	}

	else if(action.type === GET_POWERS_REQUEST){
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

	else if(action.type === UPDATE_POINTS){
		let newPowerStats = Object.assign({},state.currentPower);
		//console.log("state in reducer",state,newHeroStats);
		
		let sum = 0;
		for (let key in newPowerStats){
			if(key !== "availablePoints"){
				sum += parseInt(newPowerStats[key]);

			}
		}

		let newAvailablePoints = String(100 - sum);

		if(newAvailablePoints <= 0){
			newAvailablePoints = 0
			newPowerStats.availablePoints = newAvailablePoints;
			return Object.assign({}, state, {
			currentPower:newPowerStats
        });
		}
		else if (newAvailablePoints > 100){
			newAvailablePoints = 100;
		}
		//else if()
		newPowerStats.availablePoints = newAvailablePoints;
		newPowerStats[action.currentStat] = action.currentVal;
		//console.log("new hero stats from reducer", newHeroStats);
		return Object.assign({}, state, {
			currentPower:newPowerStats
        });
	}

	else if(action.type === CREATE_POWER_REQUEST){
		return Object.assign({}, state, {
			loading:true,
			error:null,
			message:null
        });
	}

	else if(action.type === CREATE_POWER_SUCCESS){
		return Object.assign({}, state, {
			loading:null,
			message:"success"
        });
	}
	else if(action.type === CREATE_POWER_ERROR){
		return Object.assign({}, state, {
			loading:null,
			error:action.error,
			message:null
        });
	}
	return state;
}