import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import {connect} from 'react-redux';
import {required,nonEmpty,isTrimmed} from '../validator';
import Select from './select';
import {getHero} from "../actions/hero";
export class StartBattleForm extends React.Component{

	componentDidMount() {
		this.props.dispatch(getHero(this.props.uid))
    }

    render(){
    	//make sure to add try block for when populating heroes like with superpowers
		console.log(this.props.heroes);
		return(
			<div>
				<h2>dropdown will go here</h2>
			</div>
		)
	}
}

const mapStateToProps = state => ({
    heroes:state.hero.heroes,
    success:state.hero.message
});

StartBattleForm = connect(mapStateToProps)(StartBattleForm);

export default reduxForm({
    form: 'battle',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('battle'))
})(StartBattleForm);