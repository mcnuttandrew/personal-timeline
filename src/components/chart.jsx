import React from 'react';
import ReactDOM from 'react-dom';
import d3 from 'd3';

import Data from '../constants';

const DURATION = 1000;

export default React.createClass({
  displayName : 'Chart',


  componentDidMount: function componentDidMount() {
    this._updateChart(this.props);
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    this._updateChart(nextProps);
  },

  _updateChart: function _updateChart(props) {
    const plotWidth = props.width - props.margin.left - props.margin.right;
    const plotHeight = props.height - props.margin.top - props.margin.bottom;
    const timeDomain = [new Date(Data.locationData[0].start), new Date(Data.locationData[2].end)];
    const tScale = d3.time.scale().domain(timeDomain).range([0, plotWidth]);

    const g = d3.select(ReactDOM.findDOMNode(this.refs['plot-container']));

    this.renderPlaceBoxes(g, tScale);
    this.renderOccupationWidths(g, tScale, props);
    // this.renderRelationships(g, tScale);
    this.renderAxis(g, tScale);
    this.renderEvents(g, tScale, plotHeight, props);
  },

  renderPlaceBoxes: function renderPlaceBoxes(g, tScale) {
    // JOIN
    const placeBoxes = g.selectAll('rect.place').data(Data.locationData);
    // ENTER
    placeBoxes.enter().append('rect').attr('class', 'place')
      .attr('x', 0).attr('y', 280)
      .attr('width', 0)
      .attr('height', '20');

    // UPDATE
    placeBoxes.transition().duration(DURATION)
      .attr('x', d => tScale(new Date(d.start)))
      .attr('width', d => tScale(new Date(d.end)) - tScale(new Date(d.start)))
      .attr('fill', d => d.color);
    // EXIT
    placeBoxes.exit().remove();

    // JOIN
    const placeNames = g.selectAll('text.place-name').data(Data.locationData);
    // ENTER
    placeNames.enter().append('svg:text').attr('class', 'place-name')
      .attr('font-family', 'Overpass')
      .attr('font-size', 14)
      .attr('font-weight', 'bold')
      .attr('text-anchor', 'middle')
      .attr('x', 0).attr('y', 296);

    // UPDATE
    placeNames.transition().duration(DURATION)
      .attr('x', d => (tScale(new Date(d.end)) + tScale(new Date(d.start))) / 2)
      .text(d => d.place);
    // EXIT
    placeNames.exit().remove();
  },

  renderOccupationWidths: function renderOccupationWidths(g, tScale, props) {
    // JOIN
    const occupationWidths = g.selectAll('rect.occupation-widths').data(Data.occupationData);
    // ENTER
    occupationWidths.enter().append('rect').attr('class', 'occupation-widths')
      .attr('stroke', 'no-stroke')
      .attr('y', 320)
      .attr('height', 1);

    // UPDATE
    occupationWidths.transition().duration(DURATION)
      .attr('x', d => tScale(new Date(d.start)))
      .attr('width', d => tScale(new Date(d.end)) - tScale(new Date(d.start)));
    // EXIT
    occupationWidths.exit().remove();

    ['start', 'end'].forEach(function(key) {
      const occupationHeights = g.selectAll(`rect.occupation-heights-${key}`).data(Data.occupationData);
      // ENTER
      occupationHeights.enter().append('rect').attr('class', `occupation-heights-${key}`)
      .attr('stroke', 'no-stroke')
      .attr('y', 315)
      .attr('height', 10)
      .attr('width', 1);

      // UPDATE
      occupationHeights.transition().duration(DURATION)
      .attr('x', d => tScale(new Date(d[key])));
      // EXIT
      occupationHeights.exit().remove();
    });

    const div = d3.select(ReactDOM.findDOMNode(this.refs.overlay));
    // JOIN
    const occupationContent = div.selectAll('span.occupation-content').data(Data.occupationData);
    // ENTER
    occupationContent.enter().append('span')
      .attr('class', 'occupation-content')
      .style('left', '100px')
      .style('top', '383px');

    // UPDATE
    occupationContent.transition().duration(DURATION)
      .style('left', function(d) {
        const avg =  (tScale(new Date(d.end)) + tScale(new Date(d.start)) ) / 2;
        return (avg - props.margin.left - 55) + 'px';
      })
      .text(d => d.job);
    // EXIT
    occupationContent.exit().remove();

    // JOIN
    const occupationIcon = div.selectAll('img.occupation-icon').data(Data.occupationData.filter(function(d) {
      return d.img;
    }));
    // ENTER
    occupationIcon.enter().append('img').attr('class', 'occupation-icon')
      .style('left', '100px').style('top', '380px');

    // UPDATE
    occupationIcon.transition().duration(DURATION)
      .style('left', function(d) {
        const avg =  (tScale(new Date(d.end)) + tScale(new Date(d.start)) ) / 2;
        return (avg - props.margin.left - 10) + 'px';
      })
      .attr('src', d => d.img);
    // EXIT
    occupationIcon.exit().remove();
  },

  renderAxis: function renderAxis(g, tScale) {
    const tAxis = d3.svg.axis()
      .scale(tScale)
      .tickFormat(d => ((new Date(d)).getUTCFullYear() - 1992) % 10)
      .ticks(d3.time.day, 2)
      .tickSize(0)
      .ticks(27)
      .tickPadding(0);

    g.select('.x.axis')
      .transition().duration(DURATION)
      .attr('transform', 'translate(0, 250)')
      .call(tAxis);
  },

  renderRelationships: function renderRelationships(g, tScale) {
    // JOIN
    const relationshipBoxes = g.selectAll('rect.relationship').data(Data.relationshipData);
    // ENTER
    relationshipBoxes.enter().append('rect').attr('class', 'relationship')
      .attr('x', 0)
      .attr('y', 270)
      .attr('width', 0)
      .attr('height', 10);

    // UPDATE
    relationshipBoxes.transition().duration(DURATION)
      .attr('x', d => tScale(new Date(d.start)))
      .attr('y', d => 270 - d.offset * 5)
      .attr('width', d => tScale(new Date(d.end)) - tScale(new Date(d.start)));
    // EXIT
    relationshipBoxes.exit().remove();

    // JOIN
    const relationshipTitle = g.selectAll('text.relationships-title').data(['{relationships by length}']);
    // ENTER
    relationshipTitle.enter().append('svg:text').attr('class', 'relationships-title')
      .attr('x', 0)
      .attr('y', 230);

    // UPDATE
    relationshipTitle.transition().duration(DURATION)
      .attr('x', d => tScale(tScale.domain()[1]) - 20)
      .text(d => d);
    // EXIT
    relationshipTitle.exit().remove();
  },

  renderEvents: function renderEvents(g, tScale, plotHeight, props) {
    const yScale = d3.scale.linear().domain([0, 10]).range([plotHeight, 0]);
    const div = d3.select(ReactDOM.findDOMNode(this.refs.overlay));
    // JOIN
    const eventContent = div.selectAll('span.event-content').data(Data.eventsData);
    // ENTER
    eventContent.enter().append('span').attr('class', 'event-content');

    // UPDATE
    eventContent.transition().duration(DURATION)
      .style('left', d => `${tScale(new Date(d.time)) + props.margin.left - 60}px`)
      .style('top', d => `${yScale(d.height) + props.margin.top - 18 * d.text.length / 16 - 10}px`)
      .text(d => d.text);
    // EXIT
    eventContent.exit().remove();

    // JOIN
    const eventLines = g.selectAll('line.event-line').data(Data.eventsData);
    // ENTER
    eventLines.enter().append('line').attr('class', 'event-line')
      .attr('x1', 0).attr('y1', 250)
      .attr('x2', 0).attr('y2', 250)
      .attr('stroke-width', 1);

    // UPDATE
    eventLines.transition().duration(DURATION)
      .attr('x1', d => tScale(new Date(d.time)) + 5)
      .attr('x2', d => tScale(new Date(d.time)) + 5)
      .attr('y2', d => yScale(d.height));
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
        <div className='label-overlay' ref='overlay'></div>
      </div>);
  }
});
