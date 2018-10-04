import React from 'react';
import {connect} from 'react-redux';
import {Route, withRouter} from 'react-router-dom';

import LandingPage from './landing-page';
import SignUpPage from './signup-page';
import CreateHeroPage from './create-hero-page';
import CreatePowerPage from './create-superpower-page';
import StartBattlePage from './battle-page';
import LeaderboardPage from './leaderboard-page';
import StatsPage from './stats-page';
export class App extends React.Component {
    render() {
        return (
            <div className="app">
                <Route exact path="/" component={LandingPage} />
            <Route exact path="/signup" component={SignUpPage} />
            <Route exact path="/createhero" component={CreateHeroPage} />
            <Route exact path="/createpower" component={CreatePowerPage} />
            <Route exact path="/battle" component={StartBattlePage} />
            <Route exact path="/leaderboard" component={LeaderboardPage} />
            <Route exact path="/stats" component={StatsPage} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    hasAuthToken: state.auth.authToken !== null,
    loggedIn: state.auth.currentUser !== null
});

export default withRouter(connect(mapStateToProps)(App));
