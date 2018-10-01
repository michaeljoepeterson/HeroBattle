import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import Navbar from './navComponent';
export class Dashboard extends React.Component{

	render(){

	return (
        <div className="home">
            <Navbar />
            <h2>Welcome to the dashboard {this.props.username}</h2>
        </div>
    );
	}
}

const mapStateToProps = state => {
    //const {currentUser} = state.auth;
    return {
        username: state.auth.currentUser.username,
        user:state.auth.currentUser
    };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));