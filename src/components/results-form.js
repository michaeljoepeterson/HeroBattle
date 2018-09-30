import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
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
        //css card display for heroes
		console.log("results on results page", this.props.results);
        let resultData;
        try{
            if(this.props.results){
               resultData = (<div>
                <p>Match Results</p>
                <p> {this.props.battleHero.heroName} created by {this.props.username} vs {this.props.opponent.heroOpponent.heroName} created by {this.props.opponent.opponent.username}</p>
                <div className="responsiveTable">
                <table className="defaultTable">
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
		return(
            <div>
			<h1>Results page</h1>
            {resultData}
            <form>
                <button onClick={(e)=>this.findMatch(e)}>
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