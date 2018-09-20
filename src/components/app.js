import React from 'react';
import {connect} from 'react-redux';
import {Route, withRouter} from 'react-router-dom';

import LoginForm from './login-form';
import LandingPage from './landing-page';
import SignUpPage from './signup-page';
import Dashboard from './dashboard';
import CreateHeroPage from './create-hero-page';
import CreatePowerPage from './create-superpower-page';
export class App extends React.Component {
    render() {
        return (
            <div className="app">
                <Route exact path="/" component={LandingPage} />
            <Route exact path="/signup" component={SignUpPage} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/createhero" component={CreateHeroPage} />
            <Route exact path="/createpower" component={CreatePowerPage} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    hasAuthToken: state.auth.authToken !== null,
    loggedIn: state.auth.currentUser !== null
});

export default withRouter(connect(mapStateToProps)(App));
