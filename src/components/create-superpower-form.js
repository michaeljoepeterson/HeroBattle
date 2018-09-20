import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import {connect} from 'react-redux';
import {required,nonEmpty,isTrimmed} from '../validator';
import Input from './input';

export class CreatePowerForm extends React.Component{

	onSubmit(){
		console.log("dispatch values");
	}
	render(){
		return(
			<form onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
				<h1>available Points {this.props.availablePoints}</h1>
			</form>
		)
	}
}

const mapStateToProps = state => ({
    currentPower: state.superpowers.currentPower,
    availablePoints: state.superpowers.currentPower.availablePoints
});

CreatePowerForm = connect(mapStateToProps)(CreatePowerForm);

export default reduxForm({
    form: 'superpowers',
    initialValues:{
    	
    },
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('superpowers','powerName'))
})(CreatePowerForm);