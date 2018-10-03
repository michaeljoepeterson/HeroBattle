import React from 'react';
import {shallow, mount} from 'enzyme';
import {CreateHeroPage} from './create-hero-page';

describe("<CreateHeroPage/>",()=>{
	it('CreateHeroPage Renders without crashing', () => {
		const dispatch = jest.fn();
        shallow(<CreateHeroPage />
        	);
    });

});	