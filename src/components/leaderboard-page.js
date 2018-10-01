import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import Navbar from './navComponent';
export class LeaderboardPage extends React.Component{

	render(){
		return(
			<div>
				<Navbar />
				<h1>Leaderboard</h1>
			</div>
		)
	}

}

const mapStateToProps = state => {
    return {
        username: state.auth.currentUser.username,
    };
};
export default requiresLogin()(connect(mapStateToProps)(LeaderboardPage));