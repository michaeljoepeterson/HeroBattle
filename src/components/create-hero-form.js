import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import {connect} from 'react-redux';
import {required,nonEmpty,isTrimmed} from '../validator';
import Input from './input';
import Select from './select';
import {initPage,updatePointsAction,createHero} from "../actions/hero";
import {getPowers} from '../actions/superpowers';

export class CreateHeroForm extends React.Component{

	componentDidMount() {
		this.props.dispatch(getPowers());
        this.props.dispatch(initPage());
    }


	onSubmit(values) {
		console.log("dispatch submit action",values);
		return this.props.dispatch(createHero(values));
	}

	resetValues(event){
		event.preventDefault();
		this.props.change("heroHealth","100");
		this.props.change("heroAbilityPoints","100");
		this.props.change("heroStrength","50");
		this.props.change("heroToughness","50");
		this.props.change("heroSuperAbility","50");
		this.props.change("heroAgility","50");
		this.props.change("heroName","");
		this.props.change("heroSuperpower1","");
		this.props.change("heroSuperpower2","");
		this.props.change("heroSuperpower3","");
		this.props.dispatch(initPage());
	}

	oneHundredNormalizer(key,value){
		//console.log("value in normalizer", value);
		this.props.dispatch(updatePointsAction(key,value));
		//console.log(this.props.availablePoints);
		//console.log("normalizer hero",this.props.currentHero);

		if(parseInt(this.props.availablePoints,10) === 0){
			return String(this.props.currentHero[key])
		}

		else{
			
			return value;
		}
	}

	fiftyNormalizer(key,value){
		//console.log("value in normalizer", value);
		this.props.dispatch(updatePointsAction(key,value));
		if(parseInt(this.props.availablePoints,10) === 0){
			return String(this.props.currentHero[key])
		}

		else{
			return value;
		}
	}

	render(){
		let success;
		if (this.props.success === "success") {
	            success = (
	                <div className="form-error" aria-live="polite">
	                    Hero Created!
	                </div>
	            );
	        }
		let error;
			if (this.props.error) {
	            error = (
	                <div className="form-error" aria-live="polite">
	                    {this.props.error}
	                </div>
	            );
	        }

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
				{error}
				{success}
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
					normalize={this.oneHundredNormalizer.bind(this,"heroHealth")}
					min="100"
					max="150"
					validate={[required,nonEmpty]}/>
				<label htmlFor="heroAbilityPoints">Hero Ability Points:</label>
				<Field
					component={Input}
					type="number"
					name="heroAbilityPoints"
					normalize={this.oneHundredNormalizer.bind(this,"heroAbilityPoints")}
					min="100"
					max="150"
					validate={[required,nonEmpty]}/>
				<label htmlFor="heroStrength">Hero Strength:</label>
				<Field
					component={Input}
					type="number"
					name="heroStrength"
					normalize={this.fiftyNormalizer.bind(this,"heroStrength")}
					min="50"
					max="100"
					validate={[required,nonEmpty]}/>
				<label htmlFor="heroToughness">Hero Toughness:</label>
				<Field
					component={Input}
					type="number"
					name="heroToughness"
					normalize={this.fiftyNormalizer.bind(this,"heroToughness")}
					min="50"
					max="100"
					validate={[required,nonEmpty]}/>
				<label htmlFor="heroAgility">Hero Agility:</label>
				<Field
					component={Input}
					type="number"
					name="heroAgility"
					normalize={this.fiftyNormalizer.bind(this,"heroAgility")}
					min="50"
					max="100"
					validate={[required,nonEmpty]}/>
				<label htmlFor="heroSuperAbility">Hero Intelligence:</label>
				<Field
					component={Input}
					type="number"
					name="heroSuperAbility"
					normalize={this.fiftyNormalizer.bind(this,"heroSuperAbility")}
					min="50"
					max="100"
					validate={[required,nonEmpty]}/>

				<label htmlFor="heroSuperpower1">Hero Super Power 1:</label>
				<Field
					component={Select}
					name="heroSuperpower1"
					options={superpowersData}
					defaultText="Select a power"
					validate={[required,nonEmpty]}>
					
				</Field>
				<label htmlFor="heroSuperpower2">Hero Super Power 2:</label>
				<Field
					component={Select}
					name="heroSuperpower2"
					options={superpowersData}
					defaultText="Select a power"
					validate={[required,nonEmpty]}>
				</Field>
				<label htmlFor="heroSuperpower3">Hero Super Power 3:</label>
				<Field
					component={Select}
					name="heroSuperpower3"
					options={superpowersData}
					defaultText="Select a power"
					validate={[required,nonEmpty]}>
					
				</Field>
				<button
                    type="submit"
                    disabled={this.props.pristine || this.props.submitting}>
                    Submit
                </button>
                <button onClick={(e) => this.resetValues(e)}
                    >
                    Reset
                </button>
			</form>
		);
	}

}

const mapStateToProps = state => ({
    currentHero: state.hero.currenthero,
    powers: state.superpowers.powers, 
    powerNames: state.superpowers.powerNames,
    availablePoints: state.hero.currenthero.availablePoints,
    success:state.hero.message
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
        dispatch(focus('hero','heroName'))
})(CreateHeroForm);
