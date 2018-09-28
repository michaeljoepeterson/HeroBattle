import React from 'react';
import requiresLogin from './requires-login';
import {connect} from 'react-redux';
import Navbar from './navComponent';
export class StartBattlePage extends React.Component{

	render(){
		console.log(this.props.currentUser);
		return(
			<div>
				<Navbar />
				<h1>Select a Hero {this.props.username}</h1>
			</div>
		)
	}

}

const mapStateToProps = state => {
    //const {currentUser} = state.auth;
    return {
        username: state.auth.currentUser.username,
        currentUser: state.auth.currentUser
    };
};
export default requiresLogin()(connect(mapStateToProps)(StartBattlePage));