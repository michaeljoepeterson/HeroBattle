import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import Input from './input';
import {registerUser} from '../actions/users';
import {login} from '../actions/auth';
import {required, nonEmpty, matches, length, isTrimmed} from '../validator';
import "./center.css";
const passwordLength = length({min: 10, max: 72});
const matchesPassword = matches('password');
export class RegistrationForm extends React.Component{
	//handle submit
	onSubmit(values){
		const {username, password} = values;
        const user = {username, password};
        console.log(user);
        return this.props
            .dispatch(registerUser(user))
            .then(() => this.props.dispatch(login(username, password)));
	}

	render(){
		return(
			<form 
				className="login-form"
				onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
				<label className="labelDefault" htmlFor="username">Username</label>
				<Field 
					component={Input}
                    className="defaultInput"
					type="text"
					name="username"
					validate={[required,nonEmpty,isTrimmed]}/>
				<label className="labelDefault" htmlFor="password">Password</label>
                <Field
                    component={Input}
                    className="defaultInput"
                    type="password"
                    name="password"
                    validate={[required, passwordLength, isTrimmed]}
                />
                <label className="labelDefault" htmlFor="passwordConfirm">Confirm password</label>
                <Field
                    component={Input}
                    className="defaultInput"
                    type="password"
                    name="passwordConfirm"
                    validate={[required, nonEmpty, matchesPassword]}
                />
                <button
                    type="submit"
                    className="buttonDefault"
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