import React, { Component } from 'react';
import * as d3 from 'd3';
import styled from 'styled-components';
import markdown from './README.md';

const StyledSvg = styled.svg`
  overflow: visible;
`;

const StyledPath = styled.path`
  stroke: #123452;
  stroke-width: 10;
  stroke-linecap: round;
  fill: none;
`;

class Basis1 extends Component {
  constructor(props) {
    super(props);
    this.lineRef = React.createRef();
    this.state = {
      width: 960,
      height: 500,
      data: [
        { date: new Date(2018, 0, 20), value: 3 },
        { date: new Date(2018, 0, 21), value: 5 },
        { date: new Date(2018, 0, 22), value: 3.7 },
        { date: new Date(2018, 0, 23), value: 4.5 },
        { date: new Date(2018, 0, 24), value: 3.9 }
      ]
    };
  }

  drawLine = () => {
    const xScale = d3
      .scaleTime()
      .domain(d3.extent(this.state.data, d => d.date))
      .rangeRound([0, this.state.width])
      .nice();

    const yScale = d3
      .scaleLinear()
      .domain(d3.extent(this.state.data, ({ value }) => value))
      .rangeRound([this.state.height, 0])
      .nice();

    const line = d3
      .line()
      .x(d => xScale(d.date))
      .y(d => yScale(d.value));

    return (
      <StyledPath
        width={this.state.width}
        height={this.state.height}
        d={line(this.state.data)}
      />
    );
  };

  render() {
    return (
      <StyledSvg width={this.state.width} height={this.state.height}>
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
