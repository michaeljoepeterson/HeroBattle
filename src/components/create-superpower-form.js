import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import {connect} from 'react-redux';
import {required,nonEmpty,isTrimmed} from '../validator';
import Input from './input';
import {updatePointsAction,initPage,createPower} from '../actions/superpowers';

export class CreatePowerForm extends React.Component{

	componentDidMount() {
        this.props.dispatch(initPage());
    }

	onSubmit(values){
		console.log("dispatch values",values);
		return this.props.dispatch(createPower(values));
	}

	resetValues(event){
		event.preventDefault();
		this.props.change("powerName","");
		this.props.change("powerAttack","0");
		this.props.change("powerDefence","0");
		this.props.change("powerSpecialAttack","0");
		this.props.dispatch(initPage());
	}

	normalizer(key,value){

		this.props.dispatch(updatePointsAction(key,value));

		if(this.props.availablePoints == 0){
			return String(this.props.currentPower[key])
		}

		else if(value < 0){
			return "0";
		}
		else if (value > 100){
			return "100";
		}
		else{
			return value;
		}
	}

	render(){
		let error;
			if (this.props.error) {
	            error = (
	                <div className="form-error" aria-live="polite">
	                    {this.props.error}
	                </div>
	            );
	        }
		return(
			<form onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
				<h1>Available Points {this.props.availablePoints}</h1>
				{error}
				<label htmlFor="powerName">Power Name:</label>
				<Field
					component={Input}
					type="text"
					name="powerName"
					validate={[required,nonEmpty,isTrimmed]}/>
				<label htmlFor="powerAttack">Superpower Attack:</label>
				<Field
					component={Input}
					type="number"
					name="powerAttack"
					normalize={this.normalizer.bind(this,"powerAttack")}
					validate={[required,nonEmpty]}/>
				<label htmlFor="powerDefence">SuperPower Defence:</label>
				<Field
					component={Input}
					type="number"
					name="powerDefence"
					normalize={this.normalizer.bind(this,"powerDefence")}
					validate={[required,nonEmpty]}/>
				<label htmlFor="powerSpecialAttack">Superpower Special Attack:</label>
				<Field
					component={Input}
					type="number"
					name="powerSpecialAttack"
					normalize={this.normalizer.bind(this,"powerSpecialAttack")}
					validate={[required,nonEmpty]}/>
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
		)
	}
}

const mapStateToProps = state => ({
    currentPower: state.superpowers.currentPower,
    availablePoints: state.superpowers.currentPower.availablePoints
});

CreatePowerForm = connect(mapStateToProps)(CreatePowerForm);

export default reduxForm({
    form: 'superpowers',
    initialValues:{
    	powerAttack:"0",
    	powerDefence:"0",
    	powerSpecialAttack:"0"
    },
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('superpowers','powerName'))
})(CreatePowerForm);