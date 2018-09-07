import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import Input from './input';
import {required, nonEmpty, matches, length, isTrimmed} from '../validator';
const passwordLength = length({min: 10, max: 72});
const matchesPassword = matches('password');
export class RegistrationForm extends React.Component{
	//handle submit
	onSubmit(values){
		console.log(values);
	}

	render(){
		return(
			<form 
				className="login-form"
				onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
				<label htmlFor="username">Username</label>
				<Field 
					component={Input}
					type="text"
					name="username"
					validate={[required,nonEmpty,isTrimmed]}/>
				<label htmlFor="password">Password</label>
                <Field
                    component={Input}
                    type="password"
                    name="password"
                    validate={[required, passwordLength, isTrimmed]}
                />
                <label htmlFor="passwordConfirm">Confirm password</label>
                <Field
                    component={Input}
                    type="password"
                    name="passwordConfirm"
                    validate={[required, nonEmpty, matchesPassword]}
                />
                <button
                    type="submit"
                    disabled={this.props.pristine || this.props.submitting}>
                    Sign Up
                </button>
			</form>
		);
	}
}
export default reduxForm({
    form: 'registration',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('registration', Object.keys(errors)[0]))
})(RegistrationForm);