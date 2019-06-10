import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';

import LoginForm from './login-form';
import {login} from '../actions/auth';
import "./center.css";
import "./landing.css"
export function LandingPage(props){
	if (props.loggedIn) {
        return <Redirect to="/battle" />;
    }

    function demoLogin(){
        props.dispatch(login("demouser","demopassword"));
    }   
    
	return (
        <div>
        <div className="box center">
            <h1 className="pageHeader">Welcome to Hero Battle! test</h1>
        </div>
        <div className="largeCenter">
            <div className="boxSmall">
                <p className="pageInfo">This app allows you to create a character and battle other player created heroes!</p>
            </div>
            <div className="boxSmall ">
                <p className="pageInfo">The characters can be anything you want, a hero from a tv series or your neighbour that just won't cut the grass, be creative!</p>
            </div>
            <div className="boxSmall">
                <p className="pageInfo">Start by creating a character and assigning them powers created by other user. You can even build your own superpowers!</p>
            </div>
        </div>
        <div className="home box center">
            
            <p className="pageInfo">   For a demo account click the button below!</p>
            <button onClick={() => demoLogin()} className="buttonDefault">Demo Account</button>
            <LoginForm />
            <Link className="link" to="/signup">Sign Up</Link>
        </div>
        </div>
    );
} 

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);