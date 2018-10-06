import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';

import RegistrationForm from './signup-form';
import "./center.css";
export function SignUpPage(props) {
	if (props.loggedIn) {
        return <Redirect to="/battle" />;
    }
    return (
        <div className="home box center">
            <h2>Sign Up</h2>
            <RegistrationForm />
            <Link className="link" to="/">Login</Link>
            <Link className="link" to="/signup">Sign Up</Link>
        </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(SignUpPage);
