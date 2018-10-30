import React, { Component } from 'react';
import * as d3 from 'd3';
import styled from 'styled-components';
import markdown from './README.md';

const StyledSvg = styled.svg`
  overflow: visible;
`;

const XAxis = styled.g``;
const YAxis = styled.g``;

const StyledPath = styled.path`
  stroke: #123452;
  stroke-width: 10;
  stroke-linecap: round;
  fill: none;
`;

class Basis1 extends Component {
  constructor(props) {
    super(props);
    this.xAxisRef = React.createRef();
    this.yAxisRef = React.createRef();
    this.state = {
      width: 960,
      height: 500,
      data: [
        { date: new Date(2018, 0, 20), value: 3 },
        { date: new Date(2018, 0, 21), value: 5 },
        { date: new Date(2018, 0, 22), value: 3.7 },
        { date: new Date(2018, 0, 23), value: 4.5 },
        { date: new Date(2018, 0, 24), value: 3.9 }
      ],
      xScale: null,
      yScale: null,
      xAxis: null,
      yAxis: null,
      margin: 30
    };
  }

  componentWillMount() {
    const xScale = d3
      .scaleTime()
      .domain(d3.extent(this.state.data, d => d.date))
      .rangeRound([0, this.state.width]);
    const yScale = d3
      .scaleLinear()
      .domain(d3.extent(this.state.data, ({ value }) => value))
      .rangeRound([this.state.height, 0]);
    this.setState({
      xScale,
      yScale,
      xAxis: d3
        .axisTop()
        .scale(xScale)
        .ticks(),
      yAxis: d3
        .axisLeft()
        .scale(yScale)
        .ticks()
    });
  }
  componentDidMount() {
    d3.select(this.xAxisRef).call(this.state.xAxis);
    d3.select(this.yAxisRef).call(this.state.yAxis);
  }
  drawLine = () => {
    const line = d3
      .line()
      .x(d => this.state.xScale(d.date))
      .y(d => this.state.yScale(d.value));

    return (
      <StyledPath
        transform={`translate(${this.state.margin},${this.state.margin})`}
        width={this.state.width}
        height={this.state.height}
        d={line(this.state.data)}
      />
    );
  };

  render() {
    return (
      <StyledSvg width={this.state.width} height={this.state.height}>
        <XAxis
          transform={`translate(${this.state.margin}, ${this.state.margin})`}
          ref={ref => (this.xAxisRef = ref)}
        />
        <YAxis
          transform={`translate(${this.state.margin}, ${this.state.margin})`}
          ref={ref => (this.yAxisRef = ref)}
        />
        {this.drawLine()}
      </StyledSvg>
    );
  }
}

export default [
  'Basis1',
  () => <Basis1 />,
  {
    notes: { markdown }
  }
];
