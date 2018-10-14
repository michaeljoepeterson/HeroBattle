import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import Navbar from './navComponent';
import {getStats,initPage} from "../actions/stats";
import {Link} from 'react-router-dom';
import "./responsive-table.css";
import "./center.css";

export class StatsPage extends React.Component{

	componentDidMount() {
		this.props.dispatch(initPage());
		this.props.dispatch(getStats(this.props.username));
    }

	render(){

		let totalStats;
		let statsTable;
		let error;
		let battleMessage;
		let battleLink;
			if (this.props.error) {
	            error = (
	                <div className="form-error" aria-live="polite">
	                    {this.props.error}
	                </div>
	            );
	        }
		try{

			if(this.props.stats.matches === 0){
				battleMessage = (
					<p className="formSuccess">Looks like you don't have any matches, try battling someone!</p>
				)
				battleLink = (<Link to="/battle">Battle!</Link>)
			}

			else if(this.props.stats){
				totalStats = (
					<div className="pageInfo">
					<p>Wins:{this.props.wins}</p>
					<p>Losses:{this.props.matches - this.props.wins}</p>
					<p>Matches:{this.props.matches}</p>
					<p>Win Rate:{this.props.winRate}%</p>
					</div>
				);
				let win;
				statsTable = this.props.matchHistory.map((match,index) => {
					if(match.win === "y"){
						win = "Win"
					}
					else{
						win = "Loss"
					}

					return (<tr key={index}>
						<td>{index + 1}</td>
						<td>{match.opponent}</td>
						<td>{match.opponentHero}</td>
						<td>{match.currentHero}</td>
						<td>{win}</td>
					</tr>)
				})
			}

			
			
		}
		catch(err){
			totalStats = null;
		}
		console.log(this.props.stats);
		return(
			<div>
				<Navbar/>
				<div className="home box center">
				<h1 className="pageHeader">Here are your stats {this.props.username}</h1>
				{battleMessage}
				{battleLink}
				{totalStats}
				{error}
				<div className="responsiveTable">
					<table className="defaultTable centerTable">
						<tbody>
							<tr>
								<th>Match</th>
								<th>Opponent</th>
								<th>Opponent's Hero</th>
								<th>Your Hero</th>
								<th>Result</th>
							</tr>
							{statsTable}
						</tbody>
					</table>
				</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
    return {
    	stats: state.stats.userStats,
        winRate: state.stats.userStats.winRate,
        wins: state.stats.userStats.wins,
        matches: state.stats.userStats.matches,
        matchHistory: state.stats.userStats.matchHistory,
        username: state.auth.currentUser.username,
        error:state.stats.error
    };
};
export default requiresLogin()(connect(mapStateToProps)(StatsPage));