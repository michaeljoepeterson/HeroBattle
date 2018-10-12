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
import './loader.css';
import {refreshAuthToken} from '../actions/auth';
export class App extends React.Component {
        componentDidUpdate(prevProps) {
        //if the user logged in start refresh
        if (!prevProps.loggedIn && this.props.loggedIn) {
            // When we are logged in, refresh the auth token periodically
            this.startPeriodicRefresh();
        } else if (prevProps.loggedIn && !this.props.loggedIn) {

            this.stopPeriodicRefresh();
        }
    }

    componentWillUnmount() {
        this.stopPeriodicRefresh();
    }

    startPeriodicRefresh() {
        this.refreshInterval = setInterval(
            () => this.props.dispatch(refreshAuthToken()),
            60 * 30 * 1000
        );
    }

    stopPeriodicRefresh() {
        if (!this.refreshInterval) {
            return;
        }

        clearInterval(this.refreshInterval);
    }

    render() {
        let loader;

        if(this.props.authLoad || this.props.battleLoad||this.props.heroLoad||this.props.leaderboardLoad||this.props.statsLoad||this.props.superpowerLoad){
            loader=(<div className="loader"></div>);
        }
        else{
            loader = null;
        }
        return (
            <div className="app">
                {loader}
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
    authLoad: state.auth.loading,
    battleLoad: state.battle.loading,
    heroLoad:state.hero.loading,
    leaderboardLoad:state.leaderboard.loading,
    statsLoad:state.stats.loading,
    superpowerLoad:state.superpowers.loading,
    hasAuthToken: state.auth.authToken !== null,
    loggedIn: state.auth.currentUser !== null
});

export default withRouter(connect(mapStateToProps)(App));
