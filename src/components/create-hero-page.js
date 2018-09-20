import React from 'react';
import requiresLogin from './requires-login';
import CreateHeroForm from './create-hero-form';
import Navbar from './navComponent';
export class CreateHeroPage extends React.Component{

	render(){
		return(
			<div>
				<Navbar />
				<CreateHeroForm />
			</div>
		)
	}

}


export default requiresLogin()(CreateHeroPage);