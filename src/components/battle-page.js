import React from 'react';
import requiresLogin from './requires-login';
import {connect} from 'react-redux';
import Navbar from './navComponent';
import StartBattleForm from "./battle-form";
export class StartBattlePage extends React.Component{

	render(){
		return(
			<div>
				<Navbar />
				<h1>Select a Hero {this.props.username}</h1>
				<StartBattleForm uid={this.props.currentUser.id} username={this.props.username}/>
			</div>
		)
	}

}

const mapStateToProps = state => {
    return {
        username: state.auth.currentUser.username,
        currentUser: state.auth.currentUser
    };
};
export default requiresLogin()(connect(mapStateToProps)(StartBattlePage));