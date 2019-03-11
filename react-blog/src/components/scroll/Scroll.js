import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BScroll from 'better-scroll';
import './scroll.scss';

class Scroll extends Component {
  constructor(props) {
    super(props);

    this.scrollRef = React.createRef();
  }

  componentDidMount() {
    if(!this.bScroll) {
      this.bScroll = new BScroll(this.scrollRef, {
        //实时派发scroll事件
        probeType: 3,
        click: this.props.click
      })

      if(this.props.onScroll) {
        this.bScroll.on('scroll', (scroll) => {
          this.props.onScroll(scroll);
        })
      }
    }
  }

  componentDidUpdate() {
    //组件更新后，如果实例化了better-scroll并且需要刷新就调用refresh()函数
    if(this.bScroll && this.bScroll.refresh === true) {
      this.bScroll.refresh();
    }
  }

  componentWillUnmount() {
    this.bScroll.off('scroll');
    this.bScroll = null;
  }

  refresh() {
    if(this.bScroll) {
      this.bScroll.refresh();
    }
  }

  render() {
    return (
      <div className="scroll-view" ref={this.scrollRef}>
        {/*获取子组件*/}
        {this.props.children}
      </div>
    );
  }
}

Scroll.defaultProps = {
  click: true,
  refresh: false,
  onScroll: null
}

Scroll.propTypes = {
  //是否启用点击
  click: PropTypes.bool,
  //是否刷新
  refresh: PropTypes.bool,
  onScroll: PropTypes.func
};

export default Scroll;