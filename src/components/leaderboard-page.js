import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import Navbar from './navComponent';
import {getLeaderboard,initPage} from "../actions/leaderboard";
import "./responsive-table.css";

export class LeaderboardPage extends React.Component{

	componentDidMount() {
		this.props.dispatch(initPage());
		this.props.dispatch(getLeaderboard());
    }
	render(){
		console.log("here are the scores ",this.props.scores);
		let scoreData = [];
		try{
			if(this.props.scores){
				scoreData = this.props.scores.map((score,index) => (<tr key={score.username}>
						<td>{index + 1}</td>
						<td>{score.username}</td>
						<td>{score.wins}</td>
						<td>{score.winRate}</td>
						<td>{score.matches}</td>
					</tr>))
			}
		}
		catch(err){
			scoreData = null;
		}
		return(
			<div>
				<Navbar />
				<h1>Leaderboard</h1>
				<div className="responsiveTable">
					<table className="defaultTable">
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
		)
	}

}

const mapStateToProps = state => {
    return {
        scores: state.leaderboard.scores
    };
};
export default requiresLogin()(connect(mapStateToProps)(LeaderboardPage));