import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import logo from './logo.svg';
import './App.styl';
import Home from './../modules/Home/index';


class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/home" component={Home} /> 
      </Router>
    );
  }
}

export default App;
