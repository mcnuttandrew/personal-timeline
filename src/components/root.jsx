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
        <div className="timeline-subtitle">While redrawing my personal website, I ended up re-reading my resume, and I found myself pretty alienated from the person that document described. To confront this feeling I decided to construct a portrait of my life that I feel represents it better.</div>
      </div>);
  }
});
