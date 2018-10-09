import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import {connect} from 'react-redux';
import {required,nonEmpty,isTrimmed} from '../validator';
import Input from './input';
import Select from './select';
import {initPage,updatePointsAction,createHero,updateImage,updateName,updatePower} from "../actions/hero";
import {getPowers} from '../actions/superpowers';
import './card.css';
export class CreateHeroForm extends React.Component{

	componentDidMount() {
		this.props.dispatch(getPowers());
        this.props.dispatch(initPage());
    }


	onSubmit(values) {
		console.log("dispatch submit action",values);
		return this.props.dispatch(createHero(values,this.props.currentImage));
	}

	selectImage(imgVal){
		console.log("image ", imgVal.target.value);
		console.log("current image url ", this.props.currentImage);
		if(!imgVal.target.value){
			return this.props.dispatch(updateImage("default"));
		}
		this.props.dispatch(updateImage(imgVal.target.value));
	}

	setHeroName(heroInput){
		console.log("hero input", heroInput.target.value)
		this.props.dispatch(updateName(heroInput.target.value));
	}

	setPowers(key,powerInput){
		console.log("power input", powerInput.target.value , key);
		this.props.dispatch(updatePower(powerInput.target.value,key));
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
		this.props.change("avatarSelect","");
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

		let imageNames = [];

		try{
			for(let key in this.props.imageList){
				if (key === "default"){
					continue;
				}
				imageNames.push(<option value={key} key={key}>{key}</option>);
			}
		}
		catch(err){
			imageNames = [];
		}
		console.log(this.props.cardPowers);
		return(
			
			<form onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
				<h1 className="pageHeader">Available Points {this.props.availablePoints}</h1>
				<p className="pageInfo">Create your own hero here! Create anybody you want, be creative! Each of the stats affects a different aspect of the character and how effective that character is with different super abilities. Try and find the best combination of stats and super powers!</p>
				{error}
				{success}
				<label className="labelDefault"htmlFor="heroName">Hero Name:</label>
				<Field
					component={Input}
					className="defaultInput"
					type="text"
					name="heroName"
					onChange={this.setHeroName.bind(this)}
					validate={[required,nonEmpty,isTrimmed]}/>
				<label className="labelDefault" htmlFor="heroHealth">Hero Health:</label>
				<Field
					component={Input}
					className="defaultInput"
					type="number"
					name="heroHealth"
					normalize={this.oneHundredNormalizer.bind(this,"heroHealth")}
					min="100"
					max="150"
					validate={[required,nonEmpty]}/>
				<label className="labelDefault" htmlFor="heroAbilityPoints">Hero Ability Points:</label>
				<Field
					component={Input}
					className="defaultInput"
					type="number"
					name="heroAbilityPoints"
					normalize={this.oneHundredNormalizer.bind(this,"heroAbilityPoints")}
					min="100"
					max="150"
					validate={[required,nonEmpty]}/>
				<label className="labelDefault" htmlFor="heroStrength">Hero Strength:</label>
				<Field
					component={Input}
					className="defaultInput"
					type="number"
					name="heroStrength"
					normalize={this.fiftyNormalizer.bind(this,"heroStrength")}
					min="50"
					max="100"
					validate={[required,nonEmpty]}/>
				<label className="labelDefault" htmlFor="heroToughness">Hero Toughness:</label>
				<Field
					component={Input}
					className="defaultInput"
					type="number"
					name="heroToughness"
					normalize={this.fiftyNormalizer.bind(this,"heroToughness")}
					min="50"
					max="100"
					validate={[required,nonEmpty]}/>
				<label className="labelDefault" htmlFor="heroAgility">Hero Agility:</label>
				<Field
					component={Input}
					type="number"
					className="defaultInput"
					name="heroAgility"
					normalize={this.fiftyNormalizer.bind(this,"heroAgility")}
					min="50"
					max="100"
					validate={[required,nonEmpty]}/>
				<label className="labelDefault" htmlFor="heroSuperAbility">Hero Intelligence:</label>
				<Field
					component={Input}
					className="defaultInput"
					type="number"
					name="heroSuperAbility"
					normalize={this.fiftyNormalizer.bind(this,"heroSuperAbility")}
					min="50"
					max="100"
					validate={[required,nonEmpty]}/>

				<label className="labelDefault" htmlFor="heroSuperpower1">Hero Super Power 1:</label>
				<Field
					component={Select}
					className="defaultInput"
					name="heroSuperpower1"
					options={superpowersData}
					defaultText="Select a power"
					onChange={this.setPowers.bind(this,"power1")}
					validate={[required,nonEmpty]}>
					
				</Field>
				<label className="labelDefault" htmlFor="heroSuperpower2">Hero Super Power 2:</label>
				<Field
					component={Select}
					className="defaultInput"
					name="heroSuperpower2"
					options={superpowersData}
					defaultText="Select a power"
					onChange={this.setPowers.bind(this,"power2")}
					validate={[required,nonEmpty]}>
				</Field>
				<label className="labelDefault" htmlFor="heroSuperpower3">Hero Super Power 3:</label>
				<Field
					component={Select}
					className="defaultInput"
					name="heroSuperpower3"
					options={superpowersData}
					defaultText="Select a power"
					onChange={this.setPowers.bind(this,"power3")}
					validate={[required,nonEmpty]}>
					
				</Field>
				<label className="labelDefault" htmlFor="avatarSelect">Avatar:</label>
				<Field
					component={Select}
					className="defaultInput"
					name="avatarSelect"
					options={imageNames}
					defaultText="Select a Avatar"
					onChange={this.selectImage.bind(this)}>
					
				</Field>
				<div className="center card">
				<div className="cardHeader">
				<h4><b>{this.props.cardName}</b></h4>
				</div>
				<p className="cardTop">Health:{this.props.currentHero.heroHealth}</p> 
				<p className="cardTop">Ability Points:{this.props.currentHero.heroAbilityPoints}</p> 
				<div className="cardImage"> 
				  <img src={this.props.currentImage} alt="Avatar"/>
				</div>
				  <div className="container">
				    <p>Strength:{this.props.currentHero.heroStrength}</p> 
				    <p>Toughness:{this.props.currentHero.heroToughness}</p> 
				    <p>Agility:{this.props.currentHero.heroAgility}</p> 
				    <p>Intelligence:{this.props.currentHero.heroSuperAbility}</p> 
				    <p>Power1:{this.props.cardPowers.power1}</p>
				    <p>Power2:{this.props.cardPowers.power2}</p>
				    <p>Power3:{this.props.cardPowers.power3}</p>
				  </div>
				</div>
				<button
				className="buttonDefault"
                    type="submit"
                    disabled={this.props.pristine || this.props.submitting}>
                    Submit
                </button>
                <button
                className="buttonDefault"
                onClick={(e) => this.resetValues(e)}
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
    success:state.hero.message,
    currentImage: state.hero.currentImage,
    imageList: state.hero.imageList,
    cardName:state.hero.heroName,
    cardPowers:state.hero.powers
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
