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
    var plotWidth = props.width - props.margin.left - props.margin.right;
    var plotHeight = props.height - props.margin.top - props.margin.bottom;
    var timeDomain = [new Date(Data.locationData[0].start), new Date(Data.locationData[2].end)];
    var tScale = d3.time.scale().domain(timeDomain).range([0, plotWidth]);

    var g = d3.select(ReactDOM.findDOMNode(this.refs['plot-container']));

    this.renderPlaceBoxes(g, tScale);
    this.renderOccupationWidths(g, tScale, props);
    this.renderRelationships(g, tScale);
    this.renderAxis(g, tScale);
    this.renderEvents(g, tScale, plotHeight, props);
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
        return tScale(new Date(d.start));
      })
      .attr('width', function(d) {
        return tScale(new Date(d.end)) - tScale(new Date(d.start));
      })
      .attr('fill', function(d) {
        return d.color;
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
        return (tScale(new Date(d.end)) + tScale(new Date(d.start))) / 2;
      })
      .text(function(d) {
        return d.place;
      });
    // EXIT
    placeNames.exit().remove();
  },

  renderOccupationWidths: function renderOccupationWidths(g, tScale, props) {
    // JOIN
    const occupationWidths = g.selectAll('rect.occupation-widths').data(Data.occupationData);
    // ENTER
    occupationWidths.enter().append('rect').attr('class', 'occupation-widths')
      .attr('fill', '#333')
      .attr('stroke', 'no-stroke')
      .attr('y', 320)
      .attr('height', 1);

    // UPDATE
    occupationWidths.transition().duration(1000)
      .attr('x', function(d) {
        return tScale(new Date(d.start));
      })
      .attr('width', function(d) {
        return tScale(new Date(d.end)) - tScale(new Date(d.start));
      });
    // EXIT
    occupationWidths.exit().remove();

    ['start', 'end'].forEach(function(key) {
      const occupationHeights = g.selectAll(`rect.occupation-heights-${key}`).data(Data.occupationData);
      // ENTER
      occupationHeights.enter().append('rect').attr('class', `occupation-widths-${key}`)
      .attr('fill', '#333')
      .attr('stroke', 'no-stroke')
      .attr('y', 315)
      .attr('height', 10)
      .attr('width', 1)

      // UPDATE
      occupationHeights.transition().duration(1000)
      .attr('x', function(d) {
        return tScale(new Date(d[key]));
      });
      // EXIT
      occupationHeights.exit().remove();
    })

    var div = d3.select(ReactDOM.findDOMNode(this.refs.overlay));
    // JOIN
    var occupationContent = div.selectAll('span.occupation-content').data(Data.occupationData);
    // ENTER
    occupationContent.enter().append('span').attr('class', 'occupation-content')
      .style('left', '100px').style('top', '383px');

    // UPDATE
    occupationContent.transition().duration(1000)
      .style('left', function(d) {
        const avg =  (tScale(new Date(d.end)) + tScale(new Date(d.start)) ) / 2;
        return (avg - props.margin.left - 55) + 'px';
      })
      .text(function(d) {
        return d.job;
      });
    // EXIT
    occupationContent.exit().remove();

    // JOIN
    var occupationIcon = div.selectAll('img.occupation-icon').data(Data.occupationData.filter(function(d) {
      return d.img;
    }));
    // ENTER
    occupationIcon.enter().append('img').attr('class', 'occupation-icon')
      .style('left', '100px').style('top', '380px');

    // UPDATE
    occupationIcon.transition().duration(1000)
      .style('left', function(d) {
        const avg =  (tScale(new Date(d.end)) + tScale(new Date(d.start)) ) / 2;
        return (avg - props.margin.left - 10) + 'px';
      })
      .attr('src', function(d){
        return d.img;
      });
      // .text(function(d) {
      //   return d.job;
      // });
    // EXIT
    occupationIcon.exit().remove();
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
        return tScale(new Date(d.start));
      })
      .attr('y', function(d) {
        return 270 - d.offset * 5;
      })
      .attr('width', function(d) {
        return tScale(new Date(d.end)) - tScale(new Date(d.start));
      });
    // EXIT
    relationshipBoxes.exit().remove();

    // JOIN
    var relationshipTitle = g.selectAll('text.relationships-title').data(['{relationships by length}']);
    // ENTER
    relationshipTitle.enter().append('svg:text').attr('class', 'relationships-title')
      .attr('x', 0).attr('y', 280);

    // UPDATE
    relationshipTitle.transition().duration(1000)
      .attr('x', function(d) {
        return tScale(tScale.domain()[1]);
      })
      .text(function(d) {
        return d;
      });
    // EXIT
    relationshipTitle.exit().remove();
  },

  renderEvents: function renderEvents(g, tScale, plotHeight, props) {
    var yScale = d3.scale.linear().domain([0, 10]).range([plotHeight, 0]);
    var div = d3.select(ReactDOM.findDOMNode(this.refs.overlay));
    // JOIN
    var eventContent = div.selectAll('span.event-content').data(Data.eventsData);
    // ENTER
    eventContent.enter().append('span').attr('class', 'event-content')
      .style('left', '0px').style('top', '296px');

    // UPDATE
    eventContent.transition().duration(1000)
      .style('left', function(d) {
        return (tScale(new Date(d.time)) + props.margin.left - 60) + 'px';
      })
      .style('top', function(d) {
        return (yScale(d.height) + props.margin.top - 18 * d.text.length / 16 - 10) + 'px';
      })
      .text(function(d) {
        return d.text;
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
        return tScale(new Date(d.time)) + 5;
      })
      .attr('x2', function(d) {
        return tScale(new Date(d.time)) + 5;
      })
      .attr('y2', function(d) {
        return yScale(d.height);
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
        <div className='label-overlay' ref='overlay'></div>
      </div>);
  }
});
