import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import {connect} from 'react-redux';
import {required,nonEmpty,isTrimmed} from '../validator';
import Input from './input';

export class CreateHeroForm extends React.Component{


	onSubmit() {
		//submit the hero data to the hero endpoint
		//create new action that will post data
		console.log("dispatch submit action")
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
					validate={[required,nonEmpty]}/>
				<label htmlFor="heroAbilityPoints">Hero Ability Points:</label>
				<Field
					component={Input}
					type="number"
					name="heroAbilityPoints"
					validate={[required,nonEmpty]}/>
				<label htmlFor="heroStrength">Hero Strength:</label>
				<Field
					component={Input}
					type="number"
					name="heroStrength"
					validate={[required,nonEmpty]}/>
				<label htmlFor="heroToughness">Hero Toughness:</label>
				<Field
					component={Input}
					type="number"
					name="heroToughness"
					validate={[required,nonEmpty]}/>
				<label htmlFor="heroAgility">Hero Agility:</label>
				<Field
					component={Input}
					type="number"
					name="heroAgility"
					validate={[required,nonEmpty]}/>
				<label htmlFor="heroSuperAbility">Hero Intelligence:</label>
				<Field
					component={Input}
					type="number"
					name="heroSuperAbility"
					validate={[required,nonEmpty]}/>

				<label htmlFor="heroSuperpowers">Hero Super Powers:</label>
				<Field
					component="select"
					name="heroSuperpowers"
					validate={[required,nonEmpty]}>
					<option value="">Select a power</option>
						{superpowersData}
				</Field>
			</form>
		);
	}

}

export default reduxForm({
    form: 'hero',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('hero', Object.keys(errors)[0]))
})(CreateHeroForm);
