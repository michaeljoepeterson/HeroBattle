import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import {connect} from 'react-redux';
import {required,nonEmpty} from '../validator';
import Select from './select';
import {getHero,setBattleHero} from "../actions/hero";
import {getOpponent,startBattle} from "../actions/battle";
import "./battleFormStyles.css";
export class StartBattleForm extends React.Component{

	componentDidMount() {
		this.props.dispatch(getHero(this.props.uid));
    }
    selectHero(hero){
    	const selectedIndex = hero.target.selectedIndex - 1;
    	this.props.dispatch(setBattleHero(this.props.heroes[selectedIndex],selectedIndex));
    	
    }
    findOpponent(event){
    	event.preventDefault();
    	console.log("find opponent",this.props.username);
    	this.props.dispatch(getOpponent(this.props.username));
    }

    onSubmit(values) {
		//console.log("dispatch submit action",values);
		console.log("user hero",this.props.battleHero);
		console.log("user data",this.props.currentUser);
		console.log("opponent hero",this.props.opponent.heroOpponent);
		console.log("opponent data",this.props.opponent.opponent);

		return this.props.dispatch(startBattle(this.props.battleHero,this.props.opponent.heroOpponent,this.props.currentUser,this.props.opponent.opponent))
	}
    render(){
    	//make sure to add try block for when populating heroes like with superpowers
		//console.log("hero list: ",this.props.heroes);
		//console.log("in render",this.props.battleHero);
		console.log("in render opponent ",this.props.opponent);
		//need to render this data
		let heroData;
		if(this.props.battleHero){
			heroData=(
				<div className="heroData">
					<p>{this.props.battleHero.heroName}</p>
					<p>{this.props.battleHero.heroName} Health:{this.props.battleHero.maxhealth}</p>
					<p>{this.props.battleHero.heroName} Ability Points:{this.props.battleHero.maxAbilityPoints}</p>
					<p>{this.props.battleHero.heroName} Strength:{this.props.battleHero.strength}</p>
					<p>{this.props.battleHero.heroName} Toughness:{this.props.battleHero.toughness}</p>
					<p>{this.props.battleHero.heroName} Intelligence:{this.props.battleHero.superAbility}</p>
					<p>{this.props.battleHero.heroName} Agility:{this.props.battleHero.agility}</p>
					<p>Powers:</p>
					<p>{this.props.battleHero.superPowers[0].powerName}</p>
					<ul className="powerList">
						<li>Attack:{this.props.battleHero.superPowers[0].attack}
						</li>
						<li>Defence:{this.props.battleHero.superPowers[0].defense}
						</li>
						<li>Special Attack:{this.props.battleHero.superPowers[0].specialAttack}
						</li>
					</ul>
					<p>{this.props.battleHero.superPowers[1].powerName}</p>
					<ul className="powerList">
						<li>Attack:{this.props.battleHero.superPowers[1].attack}
						</li>
						<li>Defence:{this.props.battleHero.superPowers[1].defense}
						</li>
						<li>Special Attack:{this.props.battleHero.superPowers[1].specialAttack}
						</li>
					</ul>
					<p>{this.props.battleHero.superPowers[2].powerName}</p>
					<ul className="powerList">
						<li>Attack:{this.props.battleHero.superPowers[2].attack}
						</li>
						<li>Defence:{this.props.battleHero.superPowers[2].defense}
						</li>
						<li>Special Attack:{this.props.battleHero.superPowers[2].specialAttack}
						</li>
					</ul>
				</div>
			);
		}

		let opponentData;
		try{


		if(this.props.opponent.heroOpponent){
			opponentData=(
				<div className="heroData">
					<p>VS</p>
					<p>{this.props.opponent.heroOpponent.heroName}</p>
					<p>{this.props.opponent.heroOpponent.heroName} Health:{this.props.opponent.heroOpponent.maxhealth}</p>
					<p>{this.props.opponent.heroOpponent.heroName} Ability Points:{this.props.opponent.heroOpponent.maxAbilityPoints}</p>
					<p>{this.props.opponent.heroOpponent.heroName} Strength:{this.props.opponent.heroOpponent.strength}</p>
					<p>{this.props.opponent.heroOpponent.heroName} Toughness:{this.props.opponent.heroOpponent.toughness}</p>
					<p>{this.props.opponent.heroOpponent.heroName} Intelligence:{this.props.opponent.heroOpponent.superAbility}</p>
					<p>{this.props.opponent.heroOpponent.heroName} Agility:{this.props.opponent.heroOpponent.agility}</p>
					<p>Powers:</p>
					<p>{this.props.opponent.heroOpponent.superPowers[0].powerName}</p>
					<ul className="powerList">
						<li>Attack:{this.props.opponent.heroOpponent.superPowers[0].attack}
						</li>
						<li>Defence:{this.props.opponent.heroOpponent.superPowers[0].defense}
						</li>
						<li>Special Attack:{this.props.opponent.heroOpponent.superPowers[0].specialAttack}
						</li>
					</ul>
					<p>{this.props.opponent.heroOpponent.superPowers[1].powerName}</p>
					<ul className="powerList">
						<li>Attack:{this.props.opponent.heroOpponent.superPowers[1].attack}
						</li>
						<li>Defence:{this.props.opponent.heroOpponent.superPowers[1].defense}
						</li>
						<li>Special Attack:{this.props.opponent.heroOpponent.superPowers[1].specialAttack}
						</li>
					</ul>
					<p>{this.props.opponent.heroOpponent.superPowers[2].powerName}</p>
					<ul className="powerList">
						<li>Attack:{this.props.opponent.heroOpponent.superPowers[2].attack}
						</li>
						<li>Defence:{this.props.opponent.heroOpponent.superPowers[2].defense}
						</li>
						<li>Special Attack:{this.props.opponent.heroOpponent.superPowers[2].specialAttack}
						</li>
					</ul>
					<p>Created By:{this.props.opponent.opponent.username}</p>
				</div>
			);
		}
		}
		catch(err){
			opponentData = null;
		}

		let error;
			if (this.props.error) {
	            error = (
	                <div className="form-error" aria-live="polite">
	                    {this.props.error}
	                </div>
	            );
	        }
		let heroesData = []
		try{
			heroesData = this.props.heroes.map((hero,index) =>(<option value={hero.heroName} data-key={index} key={hero.heroName}>{hero.heroName}</option>));
		}
		catch(err){
			heroesData = [];
		}
		return(
			<div>
			<h1>Select a Hero {this.props.username}</h1>
				<form onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
				{error}
				<label htmlFor="heroSelect">Hero</label>
					<Field
					component={Select}
					name="heroSelect"
					options={heroesData}
					defaultText="Select a hero"
					onChange={this.selectHero.bind(this)}
					validate={[required,nonEmpty]}/>
					<button onClick={(e) => this.findOpponent(e)}>
						Find Opponent
					</button>
					<button type="submit"
                    disabled={this.props.pristine || this.props.submitting}>
						Battle!
					</button>
				</form>
				{heroData}
				{opponentData}
			</div>
		)
	}
}

const mapStateToProps = state => ({
    heroes:state.hero.heroes,
    success:state.hero.message,
    battleHero:state.hero.battleHero,
    opponent:state.battle.opponent
});

StartBattleForm = connect(mapStateToProps)(StartBattleForm);

export default reduxForm({
    form: 'battle',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('battle','heroSelect'))
})(StartBattleForm);