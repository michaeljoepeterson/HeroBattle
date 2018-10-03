import React from 'react';
import {shallow, mount} from 'enzyme';
//need this provider and testStore in order to test redux form due to the way redux form requires the mapStateToProps function to connect
import {Provider} from 'react-redux';
import {LoginForm} from './login-form';
import testStore from '../testStore';

describe("<LoginForm/>",()=>{
	it('LoginForm Renders without crashing', () => {
        shallow(<Provider store={testStore}><LoginForm />
        	</Provider>);
    });

    it("should fire onAdd callback", ()=>{
    	const callback = jest.fn();
    	const wrapper = shallow(<Provider store={testStore}>
    	<LoginForm onSubmit={callback}/>
        	</Provider>);
    	wrapper.simulate('submit');
    	expect(callback).toHaveBeenCalled();

    });
});	