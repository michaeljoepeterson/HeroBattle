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
        <div>
        <div className="box center">
            <h1 className="pageHeader">Welcome to Hero Battle!</h1>
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
            <RegistrationForm />
            <Link className="link" to="/">Login</Link>

        </div>
        </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(SignUpPage);
