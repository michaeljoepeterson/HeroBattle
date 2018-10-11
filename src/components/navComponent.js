import React from 'react';
import {connect} from 'react-redux';
import ResponsiveMenu from 'react-responsive-navbar';
import './navStyles.css';
import Icon from 'react-icons-kit';
import {thinDown} from 'react-icons-kit/entypo/thinDown'
import {thinUp} from 'react-icons-kit/entypo/thinUp'
import {Link} from 'react-router-dom';
import {clearAuth} from '../actions/auth';
import {clearAuthToken} from '../local-storage';

export class Navbar extends React.Component{

    logOut() {

        this.props.dispatch(clearAuth());
        clearAuthToken();
    }

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
            <li><button onClick={() => this.logOut()} className="navItem" to="/">Logout</button></li>
            <li className="navHeader"><Link to="/battle" className="navHeadLink">Battle!</Link></li>
            <li ><Link className="navItem"  to="/createhero">New Hero</Link></li>
            <li><Link className="navItem" to="/createpower">New Power</Link></li>
            <li><Link className="navItem" to="/leaderboard">Leaderboard</Link></li>
            <li><Link className="navItem" to="/stats">Stats</Link></li>
            
          </ul>
        }/>
        );
	}
}

const mapStateToProps = state => ({
    user: state.auth.currentUser
});

export default connect(mapStateToProps)(Navbar);