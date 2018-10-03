import React from 'react';
import {shallow, mount} from 'enzyme';
import {CreatePowerPage} from './create-superpower-page';

describe("<CreatePowerPage/>",()=>{
	it('CreatePowerPage Renders without crashing', () => {
		const dispatch = jest.fn();
        shallow(<CreatePowerPage />
        	);
    });


});	