import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, NavLink } from 'react-router-dom';
import logo from '../logo.svg';
import './App.scss';
import '../assets/icomoon/fonts.scss';

import Home from '../modules/home/Home';
import Search from '../modules/search/Search';
import Account from '../modules//account/Account';


import Footer from '../components/footer/Footer';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Footer />
          {/*
              Switch组件用来选择最近的一个路由，否则最后一个没有指定path的路由也会显示
              Redirect重定向到列表页
            */}
            <Switch>
              <Route path="/home" component={Home} />
              <Route path="/search" component={Search} />
              <Route path="/account" component={Account} />
              <Redirect from="/" to="/home" />
              <Route component={Home} />
            </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
