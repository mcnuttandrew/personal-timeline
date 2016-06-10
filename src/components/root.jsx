import React from 'react';
import Chart from './chart.jsx';

export default React.createClass({
  displayName : 'App',

  render() {
    return (
      <div className="app">
        <Chart
          margin={{left: 50, right: 50, top: 50, bottom: 50}}
          height={520}
          width={1200} />
        <div className="timeline-title">A TIMELINE ABOUT MY LIFE</div>
        <div className="timeline-subtitle">What's that enscribbled on it? But won't that turn our ship into a piece of junk? Oh, yeah. Thank you. The previous tenant was a very prominent raccoon! Hey, what the-- Ow! What? Oh! There but for the grace of God. I can't make it! Go on without me!</div>  
      </div>);
  }
});
