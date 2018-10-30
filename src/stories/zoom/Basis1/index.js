import React, { Component } from 'react';
import * as d3 from 'd3';
import styled from 'styled-components';
import markdown from './README.md';

class Basis1 extends Component {
  constructor(props) {
    super(props);
    this.state = { width: 960, height: 500 };
    this.svgRef = React.createRef();
  }
  componentDidMount() {
    const { width, height } = this.state;
    const zoomed = d3
      .zoom()
      .scaleExtent([1, Infinity])
      .translateExtent([[0, 0], [width, height]])
      .extent([[0, 0], [width, height]])
      .on('start', function() {
        console.log(d3.event);
      })
      .on('zoom', () => {
        d3.select(this.svgRef).attr('transform', d3.event.transform);
      })
      .on('end', function() {
        console.log(d3.event);
      });
    d3.select(this.svgRef).call(zoomed);
    d3.select(this.svgRef)
      .selectAll('circle')
      .data([
        { cx: 150, cy: 210, r: 50, fill: '#ff0000' },
        { cx: 75, cy: 55, r: 40, fill: '#00cc00' },
        { cx: 200, cy: 30, r: 30, fill: '#0000ff' },
        { cx: 650, cy: 190, r: 70, fill: '#0099cc' },
        { cx: 300, cy: 200, r: 30, fill: '#ff9900' }
      ])
      .enter()
      .append('circle')
      .attr('cx', ({ cx }) => cx)
      .attr('cy', ({ cy }) => cy)
      .attr('r', ({ r }) => r)
      .attr('fill', ({ fill }) => fill);
  }
  render() {
    const { height, width } = this.state;
    return (
      <svg ref={ref => (this.svgRef = ref)} width={width} height={height} />
    );
  }
}

export default [
  '基礎1',
  () => <Basis1 />,
  {
    notes: { markdown }
  }
];
