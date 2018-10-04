import React from 'react';
import requiresLogin from './requires-login';
import Navbar from './navComponent';
import CreatePowerForm from './create-superpower-form';
import "./center.css";
export class CreatePowerPage extends React.Component{

	render(){
		return(
			<div>
				<Navbar />
				<div className="home box center">
				<CreatePowerForm />
				</div>
			</div>
		)
	}

}


export default requiresLogin()(CreatePowerPage);