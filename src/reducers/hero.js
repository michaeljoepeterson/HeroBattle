import {
	INITIALIZE_PAGE,
	UPDATE_POINTS
} from '../actions/hero';

const initialState = {
	init:{
		heroHealth:"100",
		heroAbilityPoints:"100",
		heroStrength:"50",
		heroToughness:"50",
		heroAgility:"50",
		heroSuperAbility:"50",
		availablePoints:"50"
	},
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
		let newHeroStats = action.currentHero;
		console.log("hero stats in reducer before update points ",newHeroStats)
		let sum = 0;
		for (let key in newHeroStats){
			if(key !== "availablePoints"){
				console.log("hero stats in loop reducer",newHeroStats[key])
				sum += parseInt(newHeroStats[key]);
				console.log("the sum in loop", sum);
			}
		}
		console.log("the sum is ", sum);
		const newAvailablePoints = String(450 - sum);
		newHeroStats.availablePoints = newAvailablePoints;
		console.log("new hero stats", newHeroStats);
		return Object.assign({}, state, {
			currenthero:newHeroStats
        });
	}

	return state;
}