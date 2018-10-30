import React, { Component } from 'react';
import * as d3 from 'd3';
import styled from 'styled-components';
import markdown from './README.md';

const Circle = styled.circle`
  stroke: darkcyan;
  stroke-width: 5;
  fill: papayawhip;
`;

class Basis1 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.svgRef = React.createRef();
  }
  componentDidMount() {
    const drag = d3
      .drag()
      .on('start', () => {
        console.log(d3.event);
      })
      .on('drag', function() {
        d3.select(this)
          .attr('cx', d3.event.x)
          .attr('cy', d3.event.y);
      })
      .on('end', () => {
        console.log(d3.event);
      });
    d3.select(this.svgRef)
      .selectAll('circle')
      .data([{ cx: 100, cy: 100, r: 50, fill: '#ff0000' }])
      .enter()
      .append('circle')
      .attr('cx', ({ cx }) => cx)
      .attr('cy', ({ cy }) => cy)
      .attr('r', ({ r }) => r)
      .attr('stroke', 'darkcyan')
      .attr('stroke-width', 5)
      .attr('fill', 'papayawhip')
      .call(drag);
  }
  render() {
    return <svg width={960} height={500} ref={ref => (this.svgRef = ref)} />;
  }
}

export default [
  '基礎2',
  () => <Basis1 />,
  {
    notes: { markdown }
  }
];
