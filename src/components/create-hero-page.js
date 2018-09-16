import React from 'react';
import {connect} from 'react-redux';
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

const mapStateToProps = state => ({
    data: state.superpowers.powers, 
    powerNames: state.superpowers.powerNames,
    availablePoints: 50
});

export default requiresLogin()(connect(mapStateToProps)(CreateHeroPage));