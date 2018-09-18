import {
	INITIALIZE_PAGE,
	UPDATE_POINTS
} from '../actions/hero';

const initialState = {

	currenthero:{
		heroHealth:"100",
		heroAbilityPoints:"100",
		heroStrength:"50",
		heroToughness:"50",
		heroAgility:"50",
		heroSuperAbility:"50",
		availablePoints:"50"
	}
};

export default function reducer(state = initialState,action){
	if(action.type === INITIALIZE_PAGE){
		console.log("hero reducer called",state);
		return Object.assign({}, state, {
			currenthero:{heroHealth:"100",
		heroAbilityPoints:"100",
		heroStrength:"50",
		heroToughness:"50",
		heroAgility:"50",
		heroSuperAbility:"50",
		availablePoints:"50"}
        })
	}
	else if(action.type === UPDATE_POINTS){
		/*
		let difference;
		if(action.valType === "100"){
			difference = action.value - 100;
		}
		else if(action.valType === "50"){
			difference = action.value - 50;
		}

		const newPoints = action.currentPoints - difference;
		console.log("newpoints in hero reducer",newPoints);
		*/
		//rest operator
		let newHeroStats = Object.assign({},state.currenthero);
		console.log("state in reducer",state,newHeroStats);
		
		let sum = 0;
		for (let key in newHeroStats){
			if(key !== "availablePoints"){
				//console.log("hero stats in loop reducer",newHeroStats[key])
				sum += parseInt(newHeroStats[key]);
				//console.log("the sum in loop", sum);
			}
		}
		//console.log("the sum is ", sum);
		let newAvailablePoints = String(450 - sum);
		console.log("the reducer sum",sum);
		console.log("the availablePoints", newAvailablePoints)
		if(newAvailablePoints <= 0){
			newAvailablePoints = 0
			newHeroStats.availablePoints = newAvailablePoints;
			return Object.assign({}, state, {
			currenthero:newHeroStats
        });
		}
		else if (newAvailablePoints > 50){
			newAvailablePoints = 50;
		}
		//else if()
		newHeroStats.availablePoints = newAvailablePoints;
		newHeroStats[action.currentStat] = action.currentVal;
		console.log("new hero stats from reducer", newHeroStats);
		return Object.assign({}, state, {
			currenthero:newHeroStats
        });
	}

	return state;
}