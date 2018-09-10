import React from 'react';
import {connect} from 'react-redux';
import ResponsiveMenu from 'react-responsive-navbar';
import './navStyles.css';
import Icon from 'react-icons-kit';
import {thinDown} from 'react-icons-kit/entypo/thinDown'
import {thinUp} from 'react-icons-kit/entypo/thinUp'

export class Navbar extends React.Component{
	render(){
		return(
		<ResponsiveMenu
        menuOpenButton={<div className=""><Icon icon={thinDown}/></div>}
        menuCloseButton={<div className="navButton"><Icon icon={thinUp}/></div>}
        changeMenuOn="500px"
        largeMenuClassName="largeMenu"
        smallMenuClassName="small-menu-classname"
        menu={
          <ul>
            <li className="navHeader"><a className="navHeadLink" href="#">Item 1</a></li>
            <li ><a className="navItem" href="#">Item 2</a></li>
            <li><a className="navItem" href="#">Item 3</a></li>
            <li><a className="navItem" href="#">Item 4</a></li>
          </ul>
        }/>
        );
	}
}

const mapStateToProps = state => ({
    user: state.auth.currentUser
});

export default connect(mapStateToProps)(Navbar);