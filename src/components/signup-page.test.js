import React from 'react';
import {shallow, mount} from 'enzyme';
import {SignUpPage} from './signup-page';

describe("<SignUpPage/>",()=>{
	it('SignUpPage Renders without crashing', () => {

        shallow(<SignUpPage />
        	);
    });

});	