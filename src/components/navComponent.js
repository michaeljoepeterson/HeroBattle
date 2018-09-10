import React from 'react';
import {connect} from 'react-redux';
import ResponsiveMenu from 'react-responsive-navbar';
import './navStyles.css';

export class Navbar extends React.Component{
	render(){
		return(
		<ResponsiveMenu
        menuOpenButton={<div>O</div>}
        menuCloseButton={<div>X</div>}
        changeMenuOn="500px"
        largeMenuClassName="large-menu-classname"
        smallMenuClassName="small-menu-classname"
        menu={
          <ul>
            <li className="navItem">Item 5</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
          </ul>
        }/>
        );
	}
}

const mapStateToProps = state => ({
    user: state.auth.currentUser
});

export default connect(mapStateToProps)(Navbar);