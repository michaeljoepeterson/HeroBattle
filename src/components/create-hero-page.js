import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import {connect} from 'react-redux';
import {required,nonEmpty,isTrimmed} from '../validator';
import {getPowers} from '../actions/superpowers';
import Input from './input';

export class CreateHeroPage extends React.Component{

	constructor(props){
		//call react.component constructor
		super(props);
		//get the super powers
		//then map state to props
		//then should be able to use powers from state to populate drop down and pass ids
		this.props.dispatch(getPowers())
	}

	render(){
		return(
			<div>
				<h1>test</h1>
				{this.props.data}
			</div>
		)
	}

}

const mapStateToProps = state => ({
    data: state.superpowers.powers 
});

export default connect(mapStateToProps)(CreateHeroPage);