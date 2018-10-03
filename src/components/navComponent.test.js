import React from 'react';
import {shallow, mount} from 'enzyme';
//need this provider and testStore in order to test redux form due to the way redux form requires the mapStateToProps function to connect
import {Provider} from 'react-redux';
import {Navbar} from './navComponent';
import testStore from '../testStore';

describe("<Navbar/>",()=>{
	it('Navbar Renders without crashing', () => {
        shallow(<Provider store={testStore}><Navbar />
        	</Provider>);
    });

});	