import React from 'react';
import {shallow, mount} from 'enzyme';
import {StartBattlePage} from './battle-page';

describe("<StartBattlePage/>",()=>{
	it('StartBattlePage Renders without crashing', () => {
		const dispatch = jest.fn();
        shallow(<StartBattlePage results={[]} dispatch={dispatch}/>
        	);
    });


});	