import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import {connect} from 'react-redux';
import {required,nonEmpty,isTrimmed} from '../validator';
import Input from './input';

export class CreateHeroForm extends React.Component{

	constructor(props){
		//call react.component constructor
		super(props);
		//get the super powers
		//then map state to props
		//then should be able to use powers from state to populate drop down and pass ids
		this.props.dispatch(getPowers())
	}
	onSubmit() {
		//submit the hero data to the hero endpoint
	}

}
