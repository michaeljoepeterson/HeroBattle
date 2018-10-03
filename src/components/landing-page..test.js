import React from 'react';
import {shallow, mount} from 'enzyme';
import {LandingPage} from './landing-page';


describe("<LandingPage/>",()=>{
	it('LandingPage Renders without crashing', () => {
        shallow(<LandingPage />);
    });

});	