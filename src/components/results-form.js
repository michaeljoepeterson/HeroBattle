import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import {connect} from 'react-redux';

import "./battleFormStyles.css";
export class ResultsForm extends React.Component{

	render(){
		console.log("results on results page", this.props.results);
		return(
			<h1>Results page</h1>
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