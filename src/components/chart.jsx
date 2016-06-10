import React from 'react';
import ReactDOM from 'react-dom';
import d3 from 'd3';

import Data from '../constants';

export default React.createClass({
  displayName : 'Chart',


  componentDidMount: function componentDidMount() {
    this._updateChart(this.props);
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    this._updateChart(nextProps);
  },

  _updateChart: function _updateChart(props) {
    var plotWidth = 900;
    var plotHeight = props.height - props.margin.top - props.margin.bottom;
    var timeDomain = [new Date(Data.locationData[0].START), new Date(Data.locationData[2].END)];
    var tScale = d3.time.scale().domain(timeDomain).range([0, plotWidth]);

    var g = d3.select(ReactDOM.findDOMNode(this.refs['plot-container']));

    this.renderPlaceBoxes(g, tScale);
    // this.renderOccupationWidths(g, tScale);
    this.renderRelationships(g, tScale);
    this.renderAxis(g, tScale);
    this.renderEvents(g, tScale, plotHeight);
  },

  renderPlaceBoxes: function renderPlaceBoxes(g, tScale) {
    // JOIN
    var placeBoxes = g.selectAll('rect.place').data(Data.locationData);
    // ENTER
    placeBoxes.enter().append('rect').attr('class', 'place')
      .attr('x', 0).attr('y', 280)
      .attr('width', 0).attr('height', '20');
    // UPDATE
    placeBoxes.transition().duration(1000)
      .attr('x', function(d) {
        return tScale(new Date(d.START));
      })
      .attr('width', function(d) {
        return tScale(new Date(d.END)) - tScale(new Date(d.START));
      })
      .attr('fill', function(d) {
        return d.COLOR;
      });
    // EXIT
    placeBoxes.exit().remove();

    // JOIN
    var placeNames = g.selectAll('text.place-name').data(Data.locationData);
    // ENTER
    placeNames.enter().append('svg:text').attr('class', 'place-name')
      .attr('font-family', 'HighwayGothicCondensed, Highway Gothic Condensed')
      .attr('font-size', 20)
      .attr('font-style', 'condensed')
      .attr('text-anchor', 'middle')
      .attr('fill', '#333')
      .attr('x', 0).attr('y', 296);

    // UPDATE
    placeNames.transition().duration(1000)
      .attr('x', function(d) {
        return (tScale(new Date(d.END)) + tScale(new Date(d.START))) / 2;
      })
      .text(function(d) {
        return d.PLACE;
      });
    // EXIT
    placeNames.exit().remove();
  },

  renderOccupationWidths: function renderOccupationWidths(g, tScale) {
    // JOIN
    var occupationWidths = g.selectAll('text.occupation-widths').data(Data.occupationData);
    // ENTER
    occupationWidths.enter().append('svg:text').attr('class', 'occupation-widths')
      .attr('font-family', 'HighwayGothicCondensed, Highway Gothic Condensed')
      .attr('font-style', 'condensed')
      .attr('text-anchor', 'start')
      .attr('fill', '#333')
      .attr('transform', function(d) {return 'translate(0,296)';});

    // UPDATE
    occupationWidths.transition().duration(1000)
      .style('font-size', function(d) {
        return (tScale(new Date(d.END)) - tScale(new Date(d.START))) + 'px'
      })
      .attr('transform', function(d) {
        var width = tScale(new Date(d.END)) - tScale(new Date(d.START)) / 5;
        var xPos = tScale(new Date(d.START)) + 0.2 * width;
        var yPos = width * 0.15 + 296;
        return `translate(${xPos}, ${yPos}) rotate(90)`;
      })
      .text(function(d) {
        return '}';
      });
    // EXIT
    occupationWidths.exit().remove();
  },

  renderAxis: function renderAxis(g, tScale) {
    var tAxis = d3.svg.axis()
      .scale(tScale)
      .tickFormat(function formatTick(d) {
        var date = new Date(d);
        return (date.getUTCFullYear() - 1992) % 10;
      })
      .ticks(d3.time.day, 2)
      .tickSize(0)
      .ticks(26)
      .tickPadding(0);

    g.select('.x.axis')
      .transition().duration(1000)
      .attr('transform', 'translate(0, 250)')
      .call(tAxis);
  },

  renderRelationships: function renderRelationships(g, tScale) {
    // JOIN
    var relationshipBoxes = g.selectAll('rect.relationship').data(Data.relationshipData);
    // ENTER
    relationshipBoxes.enter().append('rect').attr('class', 'relationship')
      .attr('x', 0).attr('y', 270).attr('width', 0).attr('height', 10)
      .attr('fill', '#D0021B')
      .attr('fill-opacity', 0.5);

    // UPDATE
    relationshipBoxes.transition().duration(1000)
      .attr('x', function(d) {
        return tScale(new Date(d.START));
      })
      .attr('y', function(d) {
        return 270 - d.OFFSET * 5;
      })
      .attr('width', function(d) {
        return tScale(new Date(d.END)) - tScale(new Date(d.START));
      });
    // EXIT
    relationshipBoxes.exit().remove();
  },

  renderEvents: function renderEvents(g, tScale, plotHeight) {
    var yScale = d3.scale.linear().domain([0, 10]).range([plotHeight, 0]);
    // JOIN
    var eventContent = g.selectAll('text.event-content').data(Data.eventsData);
    // ENTER
    eventContent.enter().append('svg:text').attr('class', 'event-content')
      .attr('font-family', 'GillSans-LightItalic, Gill Sans')
      .attr('font-size', 18)
      .attr('font-style', 'condensed')
      .attr('text-anchor', 'middle')
      .attr('line-spacing', 17)
      .attr('font-weight', 300)
      .attr('fill', '#333')
      .attr('width', '60')
      .attr('x', 0).attr('y', 296);

    // UPDATE
    eventContent.transition().duration(1000)
      .attr('x', function(d) {
        return tScale(new Date(d.TIME));
      })
      .attr('y', function(d) {
        return yScale(d.HEIGHT);
      })
      .text(function(d) {
        return d.TEXT;
      });
    // EXIT
    eventContent.exit().remove();

    // JOIN
    var eventLines = g.selectAll('line.event-line').data(Data.eventsData);
    // ENTER
    eventLines.enter().append('line').attr('class', 'event-line')
      .attr('x1', 0).attr('y1', 250)
      .attr('x2', 0).attr('y2', 250)
      .attr('stroke-width', 1)
      .attr('stroke', '#979797');

    // UPDATE
    eventLines.transition().duration(1000)
      .attr('x1', function(d) {
        return tScale(new Date(d.TIME)) + 5;
      })
      .attr('x2', function(d) {
        return tScale(new Date(d.TIME)) + 5;
      })
      .attr('y2', function(d) {
        return yScale(d.HEIGHT);
      });
    // EXIT
    eventLines.exit().remove();
  },

  render() {
    return (
      <div className="timeline-chart-wrapper">
        <svg className='timeline'
          ref='topLayer'
          width={this.props.width}
          height={this.props.height}>
          <g className='plot-container'
            ref='plot-container'
            transform={'translate(' + this.props.margin.left + ', ' + this.props.margin.top + ')'}>
            <g className='x axis'
              transform={'translate(0, ' + this.props.margin.top + ')'}></g>
          </g>
        </svg>
      </div>);
  }
});
