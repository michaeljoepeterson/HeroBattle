import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import Input from './input';
import {required, nonEmpty, matches, length, isTrimmed} from '../validators';
const passwordLength = length({min: 10, max: 72});
const matchesPassword = matches('password');
export class RegistrationForm extends React.Component{
	//handle submit
	onSubmit(values){

	}

	render(){
		return()
	}
}