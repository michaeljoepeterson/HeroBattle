import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import {required,nonEmpty,isTrimmed} from '../validator';
import Input from './input';
import {login} from '../actions/auth';
import "./center.css";
export class LoginForm extends React.Component{

	onSubmit(values){
		//console.log(values);
		return this.props.dispatch(login(values.username, values.password));
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
        	<form
        		className="login-form"
        		onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}
        	>
        	{error}
        	<label className="labelDefault" htmlFor="username">Username</label>
        	<Field
                className="defaultInput"
        		component={Input}
        		type="text"
        		name="username"
        		validate={[required,nonEmpty,isTrimmed]}
        	/>
        	<label className="labelDefault" htmlFor="password">Password</label>
        	<Field
        		component={Input}
                className="defaultInput"
        		type="password"
        		name="password"
        		validate={[required,nonEmpty]}
        	/>

        	<button className="buttonDefault" disabled={this.props.pristine || this.props.submitting}>
                    Log in
            </button>
        	</form>

        );
	}
}

export default reduxForm({
    form: 'login',
    onSubmitFail: (errors, dispatch) => dispatch(focus('login', 'username'))
})(LoginForm);