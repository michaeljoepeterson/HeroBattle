import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import {connect} from 'react-redux';
import {required,nonEmpty} from '../validator';
import Select from './select';
import {getHero,setBattleHero} from "../actions/hero";
import {getOpponent,startBattle} from "../actions/battle";
import "./battleFormStyles.css";
import './card.css';
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
    	//console.log("find opponent",this.props.username);
    	this.props.dispatch(getOpponent(this.props.username));
    }

    onSubmit(values) {
		//console.log("dispatch submit action",values);
		//console.log("user hero",this.props.battleHero);
		console.log("user data",this.props.currentUser);
		//console.log("opponent hero",this.props.opponent.heroOpponent);
		console.log("opponent data",this.props.opponent.opponent);

		return this.props.dispatch(startBattle(this.props.battleHero,this.props.opponent.heroOpponent,this.props.currentUser,this.props.opponent.opponent))
	}
    render(){
    	//make sure to add try block for when populating heroes like with superpowers
		console.log("hero list: ",this.props.heroes);
		//console.log("in render",this.props.battleHero);
		console.log("in render opponent ",this.props.opponent);
		let blankCard = (
				<div className="center card">
				<p className="cardTop">Health:</p>
				<p className="cardTop">Ability Points:</p> 
				<div className="cardImage">
				  <img src="https://img00.deviantart.net/9141/i/2002/31/9/b/i_invented_the_question_mark.jpg" alt="Avatar"/>
				 </div>
				  <div className="container">
				    <h4><b></b></h4> 
				    <p>Strength:</p> 
				    <p>Toughness:</p> 
				    <p>Agility:</p> 
				    <p>Intelligence:</p> 
				    <p>Power1:</p>
				    <p>Power2:</p>
				    <p>Power3:</p>
				  </div>
				</div>
			);
		//need to render this data
		let heroCard = blankCard;
		try{
		if(this.props.battleHero){
			
			heroCard = (<div className="center card">
				<div className="cardHeader">
				<h4><b>{this.props.battleHero.heroName}</b></h4>
				</div>
				<p className="cardTop">Health: {this.props.battleHero.health}</p>
				<p className="cardTop">Ability Points: {this.props.battleHero.maxAbilityPoints}</p> 
				<div className="cardImage"> 
				  <img src={this.props.battleHero.imageUrl} alt="Avatar"/>
				 </div>
				  <div className="container">
				    <p>Strength: {this.props.battleHero.strength}</p> 
				    <p>Toughness: {this.props.battleHero.toughness}</p> 
				    <p>Agility: {this.props.battleHero.agility}</p> 
				    <p>Intelligence: {this.props.battleHero.superAbility}</p> 
				    <p>Power1: {this.props.battleHero.superPowers[0].powerName}</p>
				    <p>Power2: {this.props.battleHero.superPowers[1].powerName}</p>
				    <p>Power3: {this.props.battleHero.superPowers[2].powerName}</p>
				  </div>
				</div>);
		}
		}
		catch(err){
			heroCard = blankCard;
		}

		let opponentCard = blankCard;
		try{


		if(this.props.opponent.heroOpponent){
			
			opponentCard = (<div className="center card">
			<div className="cardHeader">
				<h4><b>{this.props.opponent.heroOpponent.heroName}</b></h4>
			</div>
				<p className="cardTop">Health: {this.props.opponent.heroOpponent.health}</p> 
				    <p className="cardTop">Ability Points: {this.props.opponent.heroOpponent.maxAbilityPoints}</p> 
				<div className="cardImage">
				  <img src={this.props.opponent.heroOpponent.imageUrl} alt="Avatar"/>
				  </div>
				  <div className="container">
				    <p>Strength: {this.props.opponent.heroOpponent.strength}</p> 
				    <p>Toughness: {this.props.opponent.heroOpponent.toughness}</p> 
				    <p>Agility: {this.props.opponent.heroOpponent.agility}</p> 
				    <p>Intelligence: {this.props.opponent.heroOpponent.superAbility}</p> 
				    <p>Power1: {this.props.opponent.heroOpponent.superPowers[0].powerName}</p>
				    <p>Power2: {this.props.opponent.heroOpponent.superPowers[1].powerName}</p>
				    <p>Power3: {this.props.opponent.heroOpponent.superPowers[2].powerName}</p>
				  </div>
				</div>)
			}
		}
		catch(err){
			opponentCard = blankCard;
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
		let createHeroMessage;
		try{
			if(this.props.heroes.length === 0){
				createHeroMessage = (
					<p>Looks like you don't have any hereos, try creating some!</p>
				)
			}
		}
		catch(err){
			createHeroMessage = null;
		}
		let createdBy;
		try{
			if(this.props.opponent){
				createdBy = (
					<p>Created by {this.props.opponent.opponent.username}</p>
				)
			}
		}
		catch(err){
			createdBy = null;
		}
		return(
			<div>
			<h1 className="pageHeader">Select a Hero {this.props.username}</h1>
				<form onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
				{error}
				{createHeroMessage}
				<p className="pageInfo">Here you can battle another random hero created by another user. Click the find opponent button select a hero and then battle! If you want to play against someone else you can find another opponent.</p>
				<div className="centerButton">
					<button className="battleButton" onClick={(e) => this.findOpponent(e)}>
						Find Opponent
					</button>
					<button className="battleButton" type="submit"
                    disabled={this.props.pristine || this.props.submitting || this.props.opponent === null}>
						Battle!
					</button>
					</div>
				<label htmlFor="heroSelect">Hero</label>
					<Field
					component={Select}
					name="heroSelect"
					className="selectHero"
					options={heroesData}
					defaultText="Select a hero"
					onChange={this.selectHero.bind(this)}
					validate={[required,nonEmpty]}/>
					
					{heroCard}
					<h3>VS</h3>
					{opponentCard}
					{createdBy}
					
				</form>
				
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