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
    bc: 'red',
    width: 200,
    height: 200,
    duration: 250,
    delay: 0
  },
  {
    name: 'box2_ref',
    bc: 'green',
    width: 200,
    height: 200,
    duration: 1000,
    delay: 0
  },
  {
    name: 'box3_ref',
    bc: 'blue',
    width: 200,
    height: 200,
    duration: 1000,
    delay: 500
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
        .delay(box.delay)
        .duration(box.duration)
        .ease(d3.easeBackInOut);

      d3.select(this[box.name])
        .transition(t)
        .attrTween('y', () => {
          return d3.interpolate('0', '100');
        });
    });
  }
  render() {
    return (
      <StyledSvg width={800} height={800}>
        {boxes.map((box, i) => {
          const x = i * (box.width + 2 * 5);
          return (
            <StyledRect
            key={box.name}
              x={x}
              width={box.width}
              height={box.height}
              bc={box.bc}
              ref={ref => (this[box.name] = ref)}
            />
          );
        })}
      </StyledSvg>
    );
  }
}

export default Basis1;
