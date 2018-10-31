import React, { Component } from 'react';
import * as d3 from 'd3';
import styled from 'styled-components';
import markdown from './README.md';
import './style.css';
const StyledSvg = styled.svg`
  overflow: visible;
`;

class Basis1 extends Component {
  constructor(props) {
    super(props);
    this.svgRef = React.createRef();
    this.state = {
      width: 960,
      height: 500,
      margin: { top: 40, right: 20, bottom: 20, left: 40 },
      radius: 6,
      data: [
        { x: 100, y: 110 },
        { x: 83, y: 43 },
        { x: 92, y: 28 },
        { x: 49, y: 74 },
        { x: 51, y: 10 },
        { x: 25, y: 98 },
        { x: 77, y: 30 },
        { x: 20, y: 83 },
        { x: 11, y: 63 },
        { x: 4, y: 55 },
        { x: 0, y: 0 },
        { x: 85, y: 100 },
        { x: 60, y: 40 },
        { x: 70, y: 80 },
        { x: 10, y: 20 },
        { x: 40, y: 50 },
        { x: 25, y: 31 }
      ]
    };
  }

  componentDidMount() {
    const { data, margin, width, height, radius } = this.state;
    const xDomain = [0, d3.max(data, ({ x }) => x)];
    const yDomain = [0, d3.max(data, ({ y }) => y)];
    const xScale = d3
      .scaleLinear()
      .domain(xDomain)
      .range([margin.left, width - margin.right]);
    const yScale = d3
      .scaleLinear()
      .domain(yDomain)
      .range([margin.top, height - margin.bottom]);

    const xAxis = d3.axisTop().scale(xScale);
    const yAxis = d3.axisLeft().scale(yScale);

    const svg = d3.select(this.svgRef);

    const xLine = svg.append('path').attr('class', 'x-line');

    svg
      .append('g')
      .attr('class', 'axis')
      .attr('transform', `translate(${[0, margin.top]})`)
      .call(xAxis);
    svg
      .append('g')
      .attr('class', 'axis')
      .attr('transform', `translate(${[margin.left, 0]})`)
      .call(yAxis);

    svg
      .selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', ({ x }) => xScale(x))
      .attr('cy', ({ y }) => yScale(y))
      .attr('r', radius)
      .on('mouseover', handleMouseOver)
      .on('mouseout', mouseoverHandler);

    svg.on('mousemove', function() {
      const { offsetX, offsetY } = d3.event;
      const scaledX = xScale.invert(offsetX);
      console.log(scaledX);
      if (scaledX < xDomain[0] || scaledX > xDomain[1]) {
        xLine.attr('opacity', 0);
        return;
      }
      const lineCoords = [
        { x: offsetX, y: margin.top },
        { x: offsetX, y: height - margin.bottom }
      ];
      const line = d3
        .line()
        .x(({ x }) => x)
        .y(({ y }) => y);
      xLine.attr('d', line(lineCoords)).attr('opacity', 0.7);
      // svg.select('#pointttt').remove();
      // svg
      //   .append('circle')
      //   .attr('id', 'pointttt')
      //   .attr('r', 3)
      //   .attr('cx', x)
      //   .attr('cy', y);
    });

    svg.on('click', () => {
      console.log('d3.event :', d3.event);
      console.log('d3.event.x :', d3.event.x);
      console.log('d3.event.y :', d3.event.y);
      console.log('d3.event.offsetX :', d3.event.offsetX);
      console.log('d3.event.offsetY :', d3.event.offsetY);
    });
    function handleMouseOver(d, i) {
      d3.select(this)
        .attr('fill', 'orange')
        .attr('r', 8);
      svg
        .append('text')
        .attr('id', `t${d.x}-${d.y}-${i}`)
        .attr('x', xScale(d.x) - 30)
        .attr('y', yScale(d.y) - 15)
        .text([d.x, d.y]);
    }
    function mouseoverHandler(d, i) {
      d3.select(this)
        .attr('fill', 'black')
        .attr('r', radius);
      d3.select(`#t${d.x}-${d.y}-${i}`).remove();
    }
  }
  render() {
    return (
      <StyledSvg
        ref={ref => (this.svgRef = ref)}
        width={this.state.width}
        height={this.state.height}
      />
    );
  }
}

export default [
  '練習1',
  () => <Basis1 />,
  {
    notes: { markdown }
  }
];
