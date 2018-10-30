// https://www.oxxostudio.tw/articles/201501/svg-d3-14-transition-1.html

import React, { Component } from 'react';
import * as d3 from 'd3';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
`;
const Box = styled.div`
  margin: 0.5rem;
  position: relative;
  width: 5rem;
  height: 5rem;
  color: #fff;
  background: ${props => props.bc};
`;

const boxes = [
  { name: 'box1_ref', bc: 'red', duration: 250, delay: 0 },
  { name: 'box2_ref', bc: 'green', duration: 1000, delay: 0 },
  { name: 'box3_ref', bc: 'blue', duration: 1000, delay: 500 }
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
        .styleTween('top', () => {
          return d3.interpolate('0', '100px');
        });
    });
  }
  render() {
    return (
      <Wrapper>
        {boxes.map(box => (
          <Box key={box.name} bc={box.bc} ref={ref => (this[box.name] = ref)}>
            {box.name}
          </Box>
        ))}
      </Wrapper>
    );
  }
}

export default Basis1;
