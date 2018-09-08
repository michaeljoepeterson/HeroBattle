import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';

import RegistrationForm from './signup-form';

export function SignUpPage(props) {
	if (props.loggedIn) {
        return <Redirect to="/dashboard" />;
    }
    return (
        <div className="home">
            <h2>Sign Up</h2>
            <RegistrationForm />
            <Link to="/">Login</Link>
            <Link to="/signup">Sign Up</Link>
        </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(SignUpPage);
