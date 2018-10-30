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
    this.state = { d3Drag: null, cx: 100, cy: 100 };
    this.circleRef = React.createRef();
  }
  componentWillMount() {
    this.setState({
      d3Drag: d3
        .drag()
        .on('start', () => {
          console.log(d3.event);
        })
        .on('drag', () => {
          this.setState({ cx: d3.event.x, cy: d3.event.y });
        })
        .on('end', () => {
          console.log(d3.event);
        })
    });
  }
  componentDidMount() {
    d3.select(this.circleRef).call(this.state.d3Drag);
  }
  render() {
    const { cx, cy } = this.state;
    console.log(d3.event);
    return (
      <svg width={960} height={500}>
        <Circle ref={ref => (this.circleRef = ref)} r={50} cx={cx} cy={cy} />
      </svg>
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
