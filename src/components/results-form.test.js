import React from 'react';
import {shallow, mount} from 'enzyme';
//need this provider and testStore in order to test redux form due to the way redux form requires the mapStateToProps function to connect
import {Provider} from 'react-redux';
import {ResultsForm} from './results-form';
import testStore from '../testStore';

describe("<ResultsForm/>",()=>{
	it('ResultsForm Renders without crashing', () => {
        shallow(<Provider store={testStore}><ResultsForm />
        	</Provider>);
    });

});	