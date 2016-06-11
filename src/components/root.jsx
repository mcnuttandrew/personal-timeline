import React from 'react';
import ReactDOM from 'react-dom';
import debounce from 'lodash.debounce';

import Chart from './chart.jsx';
import Numbers from './number.jsx';

export default React.createClass({
  displayName : 'App',

  getInitialState: function getInitialState() {
    return {
      graphWidth: 0
    };
  },

  componentDidMount: function componentDidMount() {
    const containerWidth = ReactDOM.findDOMNode(this).clientWidth;
    const debounceResizer = debounce(this._resize, 0);

    window.addEventListener('resize', debounceResizer);

    this.setState({
      graphWidth: Math.max(containerWidth * 0.8, 1200),
      deboundResizer: debounceResizer
    });
  },

  _resize: function _resize() {
    if (!this.isMounted()) {
      return;
    }
    var containerWidth = ReactDOM.findDOMNode(this).clientWidth;
    this.setState({
      graphWidth: Math.max(containerWidth * 0.8, 1200)
    });
  },

  render() {
    return (
      <div className="app">
        <Chart
          margin={{left: 50, right: 200, top: 50, bottom: 50}}
          height={520}
          width={this.state.graphWidth} />
        <Numbers />
        <div className="timeline-title">A TIMELINE ABOUT MY LIFE</div>
        <div className="timeline-subtitle">What's that enscribbled on it? But won't that turn our ship into a piece of junk? Oh, yeah. Thank you. The previous tenant was a very prominent raccoon! Hey, what the-- Ow! What? Oh! There but for the grace of God. I can't make it! Go on without me!</div>
      </div>);
  }
});
