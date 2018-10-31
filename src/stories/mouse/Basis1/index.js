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
    const self = this;
    const { data, margin, width, height, radius } = this.state;
    const xScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, ({ x }) => x)])
      .range([margin.left, width - margin.right]);
    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, ({ y }) => y)])
      .range([margin.top, height - margin.bottom]);

    const xAxis = d3.axisTop().scale(xScale);
    const yAxis = d3.axisLeft().scale(yScale);

    const svg = d3.select(this.svgRef);

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

    svg.on('click', function() {
      const coords = d3.mouse(this);
      console.log(coords);
      console.log(xScale(coords[0]));
      console.log(xScale.invert(coords[0]));
      console.log(xScale(coords[1]));
      console.log(xScale.invert(coords[1]));
      data.push({
        x: Math.round(xScale.invert(coords[0])),
        y: Math.round(yScale.invert(coords[1]))
      });
      self.setState({ data });
      // svg
      //   .append('circle')
      //   .attr('cx', Math.round(xScale.invert(coords[0])))
      //   .attr('cy', Math.round(xScale.invert(coords[1])))
      //   .attr('r', radius)
      //   .on('mouseover', handleMouseOver)
      //   .on('mouseout', mouseoverHandler);
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
  componentWillUpdate() {
    const { data, margin, width, height, radius } = this.state;
    const svg = d3.select(this.svgRef);
    const xScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, ({ x }) => x)])
      .range([margin.left, width - margin.right]);
    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, ({ y }) => y)])
      .range([margin.top, height - margin.bottom]);
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
  '基礎1',
  () => <Basis1 />,
  {
    notes: { markdown }
  }
];
