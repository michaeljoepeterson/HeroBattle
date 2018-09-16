import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import {connect} from 'react-redux';
import {required,nonEmpty,isTrimmed} from '../validator';
import Input from './input';
import {initPage} from "../actions/hero";
import {getPowers} from '../actions/superpowers';

export class CreateHeroForm extends React.Component{

	componentDidMount() {
		this.props.dispatch(getPowers());
        this.props.dispatch(initPage());
       	console.log("default vals from state", this.props.defaultVals);
    }


	onSubmit(values) {
		//submit the hero data to the hero endpoint
		//create new action that will post data
		console.log("dispatch submit action",values);
	}

	oneHundredNormalizer(value){
		console.log("value in normalizer", value);
		if(value < 100){
			return "100"
		}
		else if (value > 150){
			return "150"
		}
		else{
			return value
		}
	}

	fiftyNormalizer(value){
		console.log("value in normalizer", value);
		if(value < 50){
			return "50"
		}
		else if (value > 100){
			return "100"
		}
		else{
			return value
		}
	}

	render(){
		console.log("form powers" ,this.props.powers);
		console.log("form powers names" ,this.props.powerNames);
		let superpowersData = []
		try{
			superpowersData = this.props.powerNames.map(name =>(<option value={name} key={name}>{name}</option>));
		}
		catch(err){
			superpowersData = [];
		}
		
		return(
		
			<form onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
				<h1>available Points {this.props.availablePoints}</h1>
				<label htmlFor="heroName">Hero Name:</label>
				<Field
					component={Input}
					type="text"
					name="heroName"
					validate={[required,nonEmpty,isTrimmed]}/>
				<label htmlFor="heroHealth">Hero Health:</label>
				<Field
					component={Input}
					type="number"
					name="heroHealth"
					normalize={this.oneHundredNormalizer}
					validate={[required,nonEmpty]}/>
				<label htmlFor="heroAbilityPoints">Hero Ability Points:</label>
				<Field
					component={Input}
					type="number"
					name="heroAbilityPoints"
					normalize={this.oneHundredNormalizer}
					validate={[required,nonEmpty]}/>
				<label htmlFor="heroStrength">Hero Strength:</label>
				<Field
					component={Input}
					type="number"
					name="heroStrength"
					normalize={this.fiftyNormalizer}
					validate={[required,nonEmpty]}/>
				<label htmlFor="heroToughness">Hero Toughness:</label>
				<Field
					component={Input}
					type="number"
					name="heroToughness"
					normalize={this.fiftyNormalizer}
					validate={[required,nonEmpty]}/>
				<label htmlFor="heroAgility">Hero Agility:</label>
				<Field
					component={Input}
					type="number"
					name="heroAgility"
					normalize={this.fiftyNormalizer}
					validate={[required,nonEmpty]}/>
				<label htmlFor="heroSuperAbility">Hero Intelligence:</label>
				<Field
					component={Input}
					type="number"
					name="heroSuperAbility"
					normalize={this.fiftyNormalizer}
					validate={[required,nonEmpty]}/>

				<label htmlFor="heroSuperpower1">Hero Super Power 1:</label>
				<Field
					component="select"
					name="heroSuperpower1"
					validate={[required,nonEmpty]}>
					<option value="">Select a power</option>
						{superpowersData}
				</Field>
				<label htmlFor="heroSuperpower2">Hero Super Power 2:</label>
				<Field
					component="select"
					name="heroSuperpower2"
					validate={[required,nonEmpty]}>
					<option value="">Select a power</option>
						{superpowersData}
				</Field>
				<label htmlFor="heroSuperpower3">Hero Super Power 3:</label>
				<Field
					component="select"
					name="heroSuperpower3"
					validate={[required,nonEmpty]}>
					<option value="">Select a power</option>
						{superpowersData}
				</Field>
				<button
                    type="submit"
                    disabled={this.props.pristine || this.props.submitting}>
                    Sign Up
                </button>
			</form>
		);
	}

}

const mapStateToProps = state => ({
    defaultVals: state.hero.init,
    powers: state.superpowers.powers, 
    powerNames: state.superpowers.powerNames,
    availablePoints: state.hero.init.availablePoints
});

CreateHeroForm = connect(mapStateToProps)(CreateHeroForm);

export default reduxForm({
    form: 'hero',
    initialValues:{
    	heroHealth:"100",
		heroAbilityPoints:"100",
		heroStrength:"50",
		heroToughness:"50",
		heroAgility:"50",
		heroSuperAbility:"50"
    },
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('hero', Object.keys(errors)[0]))
})(CreateHeroForm);
