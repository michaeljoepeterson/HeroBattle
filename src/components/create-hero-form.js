import React from 'react';
import {Field, reduxForm, focus,getFormValues} from 'redux-form';
import {connect} from 'react-redux';
import {required,nonEmpty,isTrimmed} from '../validator';
import Input from './input';
import {initPage,updatePointsAction} from "../actions/hero";
import {getPowers} from '../actions/superpowers';

export class CreateHeroForm extends React.Component{

	componentDidMount() {
		this.props.dispatch(getPowers());
        this.props.dispatch(initPage());
       	//console.log("default vals from state", this.props.defaultVals);
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

	updatePoints(value){
		console.log("value from on change" ,value.currentTarget.name);
		console.log("current hero in props" ,this.props.currentHero);
		let val = parseInt(value.target.value);
		const defaultValue = value.target.defaultValue;
		const currentStat = value.currentTarget.name;
		let newHeroStats = Object.assign({},this.props.currentHero);
		//console.log("after copy", newHeroStats);
		//console.log("after copy points",newHeroStats["availablePoints"]);
		if (val === 99 && defaultValue === "100"){
			val = 100;
		}
		else if(val === 151 && defaultValue === "100"){
			val = 150;
		}
		else if(val === 49 && defaultValue === "50"){
			val = 50;
		}
		else if(val === 101 && defaultValue === "50"){
			val = 100;
		}
		//console.log("adjusted val from on change",val,defaultValue);
		/*
		for (let key in newHeroStats){
			console.log("key",key,newHeroStats[key]);
			if(key === currentStat){
				console.log("found the stat");
				newHeroStats[key] = String(val);
			}
		}
		*/
		newHeroStats[currentStat] = String(val);
		console.log("props avail points", this.props.availablePoints);
		//newHeroStats["availablePoints"] = this.props.availablePoints;
		console.log("before dispatch stats", newHeroStats);
		this.props.dispatch(updatePointsAction(newHeroStats,this.props.availablePoints));
	}

	render(){
		//console.log("form powers" ,this.props.powers);
		//console.log("form powers names" ,this.props.powerNames);
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
					onChange={e => this.updatePoints(e)}
					validate={[required,nonEmpty]}/>
				<label htmlFor="heroAbilityPoints">Hero Ability Points:</label>
				<Field
					component={Input}
					type="number"
					name="heroAbilityPoints"
					normalize={this.oneHundredNormalizer}
					onChange={e => this.updatePoints(e)}
					validate={[required,nonEmpty]}/>
				<label htmlFor="heroStrength">Hero Strength:</label>
				<Field
					component={Input}
					type="number"
					name="heroStrength"
					normalize={this.fiftyNormalizer}
					onChange={e => this.updatePoints(e)}
					validate={[required,nonEmpty]}/>
				<label htmlFor="heroToughness">Hero Toughness:</label>
				<Field
					component={Input}
					type="number"
					name="heroToughness"
					normalize={this.fiftyNormalizer}
					onChange={e => this.updatePoints(e)}
					validate={[required,nonEmpty]}/>
				<label htmlFor="heroAgility">Hero Agility:</label>
				<Field
					component={Input}
					type="number"
					name="heroAgility"
					normalize={this.fiftyNormalizer}
					onChange={e => this.updatePoints(e)}
					validate={[required,nonEmpty]}/>
				<label htmlFor="heroSuperAbility">Hero Intelligence:</label>
				<Field
					component={Input}
					type="number"
					name="heroSuperAbility"
					normalize={this.fiftyNormalizer}
					onChange={e => this.updatePoints(e)}
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
    currentHero: state.hero.currenthero,
    powers: state.superpowers.powers, 
    powerNames: state.superpowers.powerNames,
    availablePoints: state.hero.currenthero.availablePoints
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
