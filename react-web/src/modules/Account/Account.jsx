/*
 * @Author: yinglgn
 * @Date: 2019-02-27 16:40:58
 * @Last Modified by: yinglgn
 * @Last Modified time: 2019-02-27 16:59:28
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
//import { Test } from './Account.styles';

class Account extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      isToggleOn: true,
      data: {
        worldName: 'world'
      }
    };
  }

  componentWillMount = () => {
    console.log('Account will mount');
  }

  componentDidMount = () => {
    console.log('Account mounted');
  }

  componentWillReceiveProps = (nextProps) => {
    console.log('Account will receive props', nextProps);
  }

  componentWillUpdate = (nextProps, nextState) => {
    console.log('Account will update', nextProps, nextState);
  }

  componentDidUpdate = () => {
    console.log('Account did update');
  }

  componentWillUnmount = () => {
    console.log('Account will unmount');
  }

  handleClick() {
    this.setState( prevState => {
      isToggleOn: !prevState.isToggleOn
    })
  }

  render () {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return (
      <div className="AccountWrapper">
        Test content
        <h1>hello {this.state.data.worldName}</h1>
        <button onClick="{this.handleClick}">
          { this.state.isToggleOn ? 'On' : 'Off'}
        </button>
      </div>
    );
  }
}

Account.propTypes = {
  // bla: PropTypes.string,
};

Account.defaultProps = {
  // bla: 'test',
};

export default Account;
