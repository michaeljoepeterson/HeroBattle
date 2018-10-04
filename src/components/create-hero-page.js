import React from 'react';
import requiresLogin from './requires-login';
import CreateHeroForm from './create-hero-form';
import Navbar from './navComponent';
import "./center.css";
export class CreateHeroPage extends React.Component{

	render(){
		return(
			<div>
				<Navbar />
				<div className="home box center">
				<CreateHeroForm />
				</div>
			</div>
		)
	}

}


export default requiresLogin()(CreateHeroPage);