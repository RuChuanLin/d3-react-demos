// https://www.oxxostudio.tw/articles/201501/svg-d3-14-transition-1.html

import React, { Component } from 'react';
import * as d3 from 'd3';
import styled from 'styled-components';

const StyledSvg = styled.svg``;

const StyledRect = styled.rect`
  fill: ${props => props.bc};
`;

const boxes = [
  {
    name: 'box1_ref',
    ease: d3.easeLinear
  },
  {
    name: 'box2_ref',
    ease: d3.easePoly.exponent(10)
  },
  {
    name: 'box3_ref',
    ease: d3.easeQuad
  },
  {
    name: 'box4_ref',
    ease: d3.easeCubic
  },
  {
    name: 'box5_ref',
    ease: d3.easeSin
  },
  {
    name: 'box6_ref',
    ease: d3.easeExp
  },
  {
    name: 'box7_ref',
    ease: d3.easeCircle
  },
  {
    name: 'box8_ref',
    ease: d3.easeElastic.amplitude(0.1)
  },
  {
    name: 'box9_ref',
    ease: d3.easeBack.overshoot(6)
  },
  {
    name: 'box10_ref',
    ease: d3.easeBounce
  }
];

class Basis1 extends Component {
  constructor(props) {
    super(props);
    boxes.forEach(box => {
      this[box.name] = React.createRef();
    });
  }

  componentDidMount() {
    boxes.forEach(box => {
      const t = d3
        .transition()
        .duration(3000)
        .ease(box.ease);

      d3.select(this[box.name])
        .transition(t)
        .attrTween('y', () => {
          return d3.interpolate('0', '100');
        });
    });
  }
  render() {
    return (
      <StyledSvg width={1200} height={1200}>
        {boxes.map((box, i) => {
          const x = i * (100 + 2 * 5);
          return (
            <StyledRect
              key={box.name}
              x={x}
              width={100}
              height={100}
              bc="#456789"
              ref={ref => (this[box.name] = ref)}
            />
          );
        })}
      </StyledSvg>
    );
  }
}

export default Basis1;
