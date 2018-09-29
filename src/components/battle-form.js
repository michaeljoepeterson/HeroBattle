import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import {connect} from 'react-redux';
import {required,nonEmpty} from '../validator';
import Select from './select';
import {getHero,setBattleHero} from "../actions/hero";
export class StartBattleForm extends React.Component{

	componentDidMount() {
		this.props.dispatch(getHero(this.props.uid))
    }
    selectHero(hero){
    	const selectedIndex = hero.target.selectedIndex - 1;
    	this.props.dispatch(setBattleHero(this.props.heroes[selectedIndex],selectedIndex));
    	
    }
    render(){
    	//make sure to add try block for when populating heroes like with superpowers
		console.log(this.props.heroes);
		console.log("in render",this.props.battleHero);
		//need to render this data
		let error;
			if (this.props.error) {
	            error = (
	                <div className="form-error" aria-live="polite">
	                    {this.props.error}
	                </div>
	            );
	        }
		let heroesData = []
		try{
			heroesData = this.props.heroes.map((hero,index) =>(<option value={hero.heroName} data-key={index} key={hero.heroName}>{hero.heroName}</option>));
		}
		catch(err){
			heroesData = [];
		}
		return(
			<div>
				<form>
				{error}
				<label htmlFor="heroSelect">Hero</label>
					<Field
					component={Select}
					name="heroSelect"
					options={heroesData}
					defaultText="Select a hero"
					onChange={this.selectHero.bind(this)}
					validate={[required,nonEmpty]}/>
				</form>
			</div>
		)
	}
}

const mapStateToProps = state => ({
    heroes:state.hero.heroes,
    success:state.hero.message,
    battleHero:state.hero.battleHero
});

StartBattleForm = connect(mapStateToProps)(StartBattleForm);

export default reduxForm({
    form: 'battle',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('battle','heroSelect'))
})(StartBattleForm);