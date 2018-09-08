import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';

export class Dashboard extends React.Component{
	checkLogin(){
		console.log("checking login");
		if(this.props.loggedIn === false){
			console.log("user not logged in")
			return <Redirect to="/signup"/>;
		}
	}
	render(){
		this.checkLogin();
	return (
        <div className="home">
            <h2>Welcome to the dashboard</h2>
        </div>
    );
	}
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(Dashboard);