import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import Navbar from './navComponent';
import {getLeaderboard,initPage} from "../actions/leaderboard";
import "./responsive-table.css";
import "./center.css";
export class LeaderboardPage extends React.Component{

	componentDidMount() {
		this.props.dispatch(initPage());
		this.props.dispatch(getLeaderboard());
    }
	render(){
		console.log("here are the scores ",this.props.scores);
		let scoreData = [];
		let error;
		if (this.props.error) {
	            error = (
	                <div className="form-error" aria-live="polite">
	                    {this.props.error}
	                </div>
	            );
	        }
		try{

			if(this.props.scores){
				scoreData = this.props.scores.map((score,index) => (<tr key={score.username}>
						<td>{index + 1}</td>
						<td>{score.username}</td>
						<td>{score.wins}</td>
						<td>{score.matches}</td>
						<td>{score.winRate}%</td>
					</tr>))
			}
		}
		catch(err){
			scoreData = null;
		}
		return(
			<div>
				<Navbar />
				<div className="home box center">
				<h1>Top Players</h1>
				{error}
				<div className="responsiveTable">
					<table className="defaultTable centerTable">
						<tbody>
							<tr>
								<th>Rank</th>
								<th>User</th>
								<th>Wins</th>
								<th>Matches</th>
								<th>Win Rate</th>
							</tr>
							{scoreData}
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
        scores: state.leaderboard.scores,
        error: state.leaderboard.error
    };
};
export default requiresLogin()(connect(mapStateToProps)(LeaderboardPage));