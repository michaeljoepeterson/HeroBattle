import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';

import LoginForm from './login-form';

export function LandingPage(props){
	return (
        <div className="home">
            <h2>Welcome</h2>
            <LoginForm />
            <Link to="/">Login</Link>
        </div>
    );
} 

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);