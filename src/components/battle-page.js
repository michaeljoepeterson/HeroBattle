import React from 'react';
import requiresLogin from './requires-login';
import {connect} from 'react-redux';
import Navbar from './navComponent';
import StartBattleForm from "./battle-form";
import ResultsForm from "./results-form";
export class StartBattlePage extends React.Component{

	render(){
		let formRender;
		if(this.props.results){
			formRender = null;
		}
		else{
			formRender = (<StartBattleForm uid={this.props.currentUser.id} username={this.props.username} currentUser={this.props.currentUser}/>);
		}
		return(
			<div>
				<Navbar />
				<h1>Select a Hero {this.props.username}</h1>
				{formRender}
			</div>
		)
	}

}

const mapStateToProps = state => {
    return {
    	results:state.battle.results,
        username: state.auth.currentUser.username,
        currentUser: state.auth.currentUser
    };
};
export default requiresLogin()(connect(mapStateToProps)(StartBattlePage));