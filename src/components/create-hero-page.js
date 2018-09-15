import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import {getPowers} from '../actions/superpowers';
import Input from './input';

export class CreateHeroPage extends React.Component{

	 componentDidMount() {
        this.props.dispatch(getPowers());
    }

	render(){
		console.log("props data in component ",this.props.data);
		return(
			<div>
				<h1>test</h1>			
			</div>
		)
	}

}

const mapStateToProps = state => ({
    data: state.superpowers.powers 
});

export default requiresLogin()(connect(mapStateToProps)(CreateHeroPage));