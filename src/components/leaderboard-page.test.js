import React from 'react';
import {shallow, mount} from 'enzyme';
import {LeaderboardPage} from './leaderboard-page';

describe("<LeaderboardPage/>",()=>{
	it('LeaderboardPage Renders without crashing', () => {
		const dispatch = jest.fn();
        shallow(<LeaderboardPage dispatch={dispatch}/>
        	);
    });

});	