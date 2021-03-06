import {
	INITIALIZE_PAGE,
	UPDATE_POINTS,
	CREATE_HERO_REQUEST,
	CREATE_HERO_SUCCESS,
	CREATE_HERO_ERROR,
	GET_HERO_REQUEST,
	GET_HERO_SUCCESS,
	GET_HERO_ERROR,
	SET_BATTLE_HERO,
	UPDATE_IMAGE,
	UPDATE_NAME,
	UPDATE_POWER
} from '../actions/hero';

const initialState = {
	loading:null,
	error:null,
	message:null,
	heroName:null,
	powers:{
		power1:null,
		power2:null,
		power3:null
	},
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
	battleHero:null,
	imageList:{
		default:"https://img00.deviantart.net/9141/i/2002/31/9/b/i_invented_the_question_mark.jpg",
		pikachu:"https://orig00.deviantart.net/7a90/f/2009/118/3/f/8_bit_art_by_ravenhayden.png",
		ralph:"https://orig00.deviantart.net/ad19/f/2018/182/8/e/wreck_it_ralph_by_jarquin10-dcg0yg8.gif",
		mike:"https://orig00.deviantart.net/8eec/f/2018/146/0/3/mike_wazowski_by_jarquin10-dccln5u.gif",
		dt:"https://orig00.deviantart.net/4a68/f/2018/019/3/d/donald_trump__by_jarquin10-dc0ib3g.gif",
		mugman:"https://orig00.deviantart.net/ffd9/f/2018/184/f/d/mugman_by_jarquin10-dcg6tr6.gif",
		wallE:"https://orig00.deviantart.net/f5ad/f/2018/181/6/e/wall_e_and_eve_by_jarquin10-dcfw5a3.gif",
		chibi:"https://orig00.deviantart.net/7bd8/f/2014/071/b/6/chibi_robo_sprite_by_jarquin10-d79y7yg.gif",
		stitch:"https://orig00.deviantart.net/fde0/f/2018/217/7/d/stitch_by_jarquin10-dcjaqi2.gif",
		baymax:"https://orig00.deviantart.net/91ad/f/2017/203/8/e/baymax_by_jarquin10-dbhbdiv.gif",
		sully:"https://orig00.deviantart.net/c453/f/2018/146/a/f/sulley_and_boo_by_jarquin10-dcclmlo.gif"

	},
	currentImage:"https://img00.deviantart.net/9141/i/2002/31/9/b/i_invented_the_question_mark.jpg"
};

export default function reducer(state = initialState,action){
	if(action.type === INITIALIZE_PAGE){
		return Object.assign({}, state, {
		currenthero:{heroHealth:"100",
		heroAbilityPoints:"100",
		heroStrength:"50",
		heroToughness:"50",
		heroAgility:"50",
		heroSuperAbility:"50",
		availablePoints:"50"},
		battleHero:null,
		heroName:null,
		powers:{
		power1:null,
		power2:null,
		power3:null
		},
		currentImage:"https://img00.deviantart.net/9141/i/2002/31/9/b/i_invented_the_question_mark.jpg"
        })
	}
	else if(action.type === UPDATE_POINTS){


		let newHeroStats = Object.assign({},state.currenthero);

		
		let sum = 0;
		for (let key in newHeroStats){
			if(key !== "availablePoints"){
				sum += parseInt(newHeroStats[key],10);

			}
		}

		let newAvailablePoints = String(450 - sum);
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
		newHeroStats.availablePoints = newAvailablePoints;
		newHeroStats[action.currentStat] = action.currentVal;
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
		if(action.key === -1){
			return Object.assign({},state, {
			battleHero:null
        });
		}
		return Object.assign({}, state, {
			battleHero:action.hero
        });
	}

	else if(action.type === UPDATE_IMAGE){
		return Object.assign({}, state, {
			
			currentImage:state.imageList[action.imageName]
        });
	}
	else if(action.type === UPDATE_NAME){
		return Object.assign({}, state, {
			
			heroName:action.heroName
        });
	}

	else if(action.type === UPDATE_POWER){
		let newHeroPowers = Object.assign({},state.powers); 
		newHeroPowers[action.powerKey] = action.powerName;
		return Object.assign({}, state, {
			
			powers:newHeroPowers
        });
	}

	return state;
}