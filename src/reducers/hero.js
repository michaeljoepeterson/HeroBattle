import {
	INITIALIZE_PAGE,
	UPDATE_POINTS,
	CREATE_HERO_REQUEST,
	CREATE_HERO_SUCCESS,
	CREATE_HERO_ERROR,
	GET_HERO_REQUEST,
	GET_HERO_SUCCESS,
	GET_HERO_ERROR,
	SET_BATTLE_HERO
} from '../actions/hero';

const initialState = {
	loading:null,
	error:null,
	message:null,
	currenthero:{
		heroHealth:"100",
		heroAbilityPoints:"100",
		heroStrength:"50",
		heroToughness:"50",
		heroAgility:"50",
		heroSuperAbility:"50",
		availablePoints:"50"
	},
	heroes:null,
	battleHero:null
};

export default function reducer(state = initialState,action){
	if(action.type === INITIALIZE_PAGE){
		//console.log("hero reducer called",state);
		return Object.assign({}, state, {
			currenthero:{heroHealth:"100",
		heroAbilityPoints:"100",
		heroStrength:"50",
		heroToughness:"50",
		heroAgility:"50",
		heroSuperAbility:"50",
		availablePoints:"50"},
		battleHero:null
        })
	}
	else if(action.type === UPDATE_POINTS){

		//rest operator
		let newHeroStats = Object.assign({},state.currenthero);
		//console.log("state in reducer",state,newHeroStats);
		
		let sum = 0;
		for (let key in newHeroStats){
			if(key !== "availablePoints"){
				sum += parseInt(newHeroStats[key],10);

			}
		}

		let newAvailablePoints = String(450 - sum);
		//console.log("the reducer sum",sum);
		//console.log("the availablePoints", newAvailablePoints)
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
		//console.log("new hero stats from reducer", newHeroStats);
		return Object.assign({}, state, {
			currenthero:newHeroStats
        });
	}
	else if(action.type === CREATE_HERO_REQUEST){
		return Object.assign({}, state, {
			loading:true,
			error:null,
			message:null
        });
	}

	else if(action.type === CREATE_HERO_SUCCESS){
		return Object.assign({}, state, {
			loading:null,
			message:"success"
        });
	}
	else if(action.type === CREATE_HERO_ERROR){
		return Object.assign({}, state, {
			loading:null,
			error:action.error,
			message:null
        });
	}

	else if(action.type === GET_HERO_REQUEST){
		return Object.assign({}, state, {
			loading:true,
			error:null,
			message:null
        });
	}

	else if(action.type === GET_HERO_SUCCESS){
		return Object.assign({}, state, {
			loading:null,
			message:"get success",
			heroes:action.heroes
        });
	}

	else if(action.type === GET_HERO_ERROR){
		return Object.assign({}, state, {
			loading:null,
			error:action.error,
			message:null
        });
	}

	else if(action.type === SET_BATTLE_HERO){
		console.log("reducer hero",action.hero);
		if(action.key === -1){
			return Object.assign({},state, {
			battleHero:null
        });
		}
		return Object.assign({}, state, {
			battleHero:action.hero
        });
	}

	return state;
}