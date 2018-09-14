import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import {required,nonEmpty,isTrimmed} from '../validator';
import Input from './input';

export class CreateHeroForm extends React.Component{

	constructor(props){
		//call react.component constructor
		super(props);
		//get the super powers
		this.props.dispatch(getPowers())
	}
	onSubmit() {
		//submit the hero data to the hero endpoint
	}
}