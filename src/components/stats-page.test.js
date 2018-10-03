import React from 'react';
import {shallow, mount} from 'enzyme';
import {StatsPage} from './stats-page';

describe("<StatsPage/>",()=>{
	it('StatsPage Renders without crashing', () => {
		const dispatch = jest.fn();
        shallow(<StatsPage results={[]} dispatch={dispatch}/>
        	);
    });


});	