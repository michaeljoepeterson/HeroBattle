import React from 'react';
import requiresLogin from './requires-login';
import {connect} from 'react-redux';
import Navbar from './navComponent';
import {initPage} from "../actions/hero";
import {initPageBattle} from "../actions/battle";
import StartBattleForm from "./battle-form";
import ResultsForm from "./results-form";
import "./center.css";
export class StartBattlePage extends React.Component{

	componentDidMount() {
		this.props.dispatch(initPage());
		this.props.dispatch(initPageBattle());
    }

	render(){
		let formRender;
		if(this.props.results){
			formRender = (<ResultsForm username={this.props.username}/>);
		}
		else{
			formRender = (<StartBattleForm uid={this.props.currentUser.id} username={this.props.username} currentUser={this.props.currentUser}/>);
		}
		return(
			<div>
				<Navbar />
				<div className="home box center">
				{formRender}
				</div>
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