import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';

import LoginForm from './login-form';
import "./center.css";

export function LandingPage(props){
	if (props.loggedIn) {
        return <Redirect to="/battle" />;
    }
    
	return (
        <div className="home box center">
            <h1>Welcome to the hero battle simulator!</h1>
            <p>This app allows you to create a character and battle other player created heroes! The characters can be anything you want, a hero from a tv series or your neighbour that just won't cut the grass, be creative. Start by creating a character and assigning them powers created by other user. You can even build your own superpowers! For a demo account try username:demouser and password:demopassword.</p>
            
            <LoginForm />
            <Link className="link" to="/">Login</Link>
            <Link className="link" to="/signup">Sign Up</Link>
        </div>
    );
} 

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);