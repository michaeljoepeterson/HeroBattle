import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import {getPowers} from '../actions/superpowers';
import CreateHeroForm from './create-hero-form';
import Navbar from './navComponent';
export class CreateHeroPage extends React.Component{

	 componentDidMount() {
        this.props.dispatch(getPowers())
        .then(() =>{  
        console.log	("inside the then");
			for(let i = 0;i<this.props.data;i++){
			this.props.powerNames.push(this.props.data[i].powerName);
			}
        })
        
    }

	render(){
		console.log("props data in component ",this.props.data);
		console.log("props data in component ",this.props.powerNames);
		return(
			<div>
				<Navbar />
				<h1>available Points {this.props.availablePoints}</h1>
				<CreateHeroForm powers={this.props.data} points={this.props.points} powerNames={this.props.powerNames}/>
			
			</div>
		)
	}

}

const mapStateToProps = state => ({
    data: state.superpowers.powers, 
    availablePoints: 50,
    powerNames:[]
});

export default requiresLogin()(connect(mapStateToProps)(CreateHeroPage));