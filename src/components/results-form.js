import React from 'react';
import {reduxForm, focus} from 'redux-form';
import {connect} from 'react-redux';
import {initPage} from "../actions/hero";
import {initPageBattle} from "../actions/battle";
import "./battleFormStyles.css";
import "./responsive-table.css";
export class ResultsForm extends React.Component{
    findMatch(event){
        event.preventDefault();
        this.props.dispatch(initPage());
        this.props.dispatch(initPageBattle());
    }
	render(){

        let resultData;
        let winText;
        let winner;
        let winnerOpponent;
        try{
            if(this.props.results.hero1Wins > this.props.results.hero2Wins){
                winner = (<p className="winStyle">Winner!</p>
                );
                winText = (<p className="pageInfo winStyle">{this.props.battleHero.heroName} won!</p>);
                winnerOpponent = null;

            }
            else if(this.props.results.hero1Wins < this.props.results.hero2Wins){
                winnerOpponent = (<p className="winText">Winner!</p>
                );
                winText = (<p className="pageInfo winStyle">{this.props.opponent.heroOpponent.heroName} won!</p>);
                winner = null;
            }
            else{
                winner = (<p>The battle was a draw!</p>)
                winnerOpponent = (<p>The battle was a draw!</p>)
            }
        }
        catch(err){
            winner = null;
        }
        try{
            if(this.props.results){
               resultData = (<div>
                <h1 className="pageHeader">Match Results</h1>
                <p className="pageInfo"> {this.props.battleHero.heroName} created by {this.props.username} vs {this.props.opponent.heroOpponent.heroName} created by {this.props.opponent.opponent.username}</p>
                {winText}
                <div className="responsiveTable">
                <table className="defaultTable centerTable">
                    <tbody>
                    <tr>
                        <th>Hero</th>
                        <th>Total Damage Done</th>
                        <th>Total Special Damage Done</th>
                        <th>Total Ability Points Used</th>
                        <th>Total Health Healed</th>
                        <th>Total Wins</th>
                    </tr>
                    <tr>
                        <td>{this.props.battleHero.heroName}</td>
                        <td>{this.props.results.hero1Stats.damageTotal}</td>
                        <td>{this.props.results.hero1Stats.specialDamageTotal}</td>
                        <td>{this.props.results.hero1Stats.apTotal}</td>
                        <td>{this.props.results.hero1Stats.healthHealedTotal}</td>
                        <td>{this.props.results.hero1Wins}</td>
                    </tr>
                    <tr>
                        <td>{this.props.opponent.heroOpponent.heroName}</td>
                        <td>{this.props.results.hero2Stats.damageTotal}</td>
                        <td>{this.props.results.hero2Stats.specialDamageTotal}</td>
                        <td>{this.props.results.hero2Stats.apTotal}</td>
                        <td>{this.props.results.hero2Stats.healthHealedTotal}</td>
                        <td>{this.props.results.hero2Wins}</td>
                    </tr>
                    </tbody>
                </table>
                </div>
                </div>
                );
            }
        }
        catch(err){
            resultData = null;
        }
                let heroCard;
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
                </div>)
        }
        }
        catch(err){
            heroCard = null;
        }

        let opponentCard;
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
            opponentCard = null;
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
            {resultData}
            {heroCard}
            <h3 className="vsText">VS</h3>
            {opponentCard}
            {createdBy}
            <form>
                <button className="buttonDefault" onClick={(e)=>this.findMatch(e)}>
                    New Battle
                </button>
            </form>
            </div>
		)
	}

}

const mapStateToProps = state => ({
    results:state.battle.results,
    success:state.hero.message,
    battleHero:state.hero.battleHero,
    opponent:state.battle.opponent
});

ResultsForm = connect(mapStateToProps)(ResultsForm);

export default reduxForm({
    form: 'results',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('results'))
})(ResultsForm);