import React from 'react';
import {connect} from 'react-redux';
import ResponsiveMenu from 'react-responsive-navbar';
import './navStyles.css';
import Icon from 'react-icons-kit';
import {thinDown} from 'react-icons-kit/entypo/thinDown'
import {thinUp} from 'react-icons-kit/entypo/thinUp'
import {Link} from 'react-router-dom';

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
            <li className="navHeader"><Link to="/" className="navHeadLink">Battle!</Link></li>
            <li ><Link className="navItem"  to="/createhero">Create Hero</Link></li>
            <li><Link className="navItem" to="/">Create Superpower</Link></li>
            <li><Link className="navItem" to="/">Logout</Link></li>
          </ul>
        }/>
        );
	}
}

const mapStateToProps = state => ({
    user: state.auth.currentUser
});

export default connect(mapStateToProps)(Navbar);