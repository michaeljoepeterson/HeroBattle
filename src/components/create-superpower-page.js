import React from 'react';
import requiresLogin from './requires-login';
import Navbar from './navComponent';
import CreatePowerForm from './create-superpower-form';
export class CreatePowerPage extends React.Component{

	render(){
		return(
			<div>
				<Navbar />
				<CreatePowerForm />
			</div>
		)
	}

}


export default requiresLogin()(CreatePowerPage);