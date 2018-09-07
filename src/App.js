import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Route, withRouter} from 'react-router-dom';
import LoginForm from './components/login-form';
import LandingPage from './components/landing-page';
class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" component={LandingPage} />
      </div>
    );
  }
}

export default App;
