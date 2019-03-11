import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './footer.scss';

class Footer extends Component {
  render() {
    return (
      <div className="footer-tab">
        <div className="tab-item">
          <NavLink to="/home" className="nav-link">
            <i className="icon-home"></i>
          </NavLink>
        </div>
        <div className="tab-item">
          <NavLink to="/search" className="nav-link">
            <i className="icon-search"></i>
          </NavLink>
        </div>
        <div className="tab-item">
          <NavLink to="/account" className="nav-link">
            <i className="icon-user"></i>
          </NavLink>
        </div>
      </div>
    )
  }
}

export default Footer
