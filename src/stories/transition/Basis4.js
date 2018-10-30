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
    listener: 'start'
  },
  {
    name: 'box2_ref',
    listener: 'end'
  },
  {
    name: 'box3_ref',
    listener: 'interrupt'
  }
];

class Basis4 extends Component {
  constructor(props) {
    super(props);
    this.Div = React.createRef();
    boxes.forEach(box => {
      this[box.name] = React.createRef();
    });
  }

  componentDidMount() {
    boxes.forEach(box => {
      const t = d3
        .transition()
        .duration(3000)
        .ease(d3.easeLinear);

      d3.select(this[box.name])
        .transition(t)
        .attrTween('y', () => {
          return d3.interpolate(0, 100);
        })
        .on(box.listener, function(d, i, g) {
          console.log(d, i, g);
          d3.select(this).attr('stroke', '#987654');
        });
    });
  }
  render() {
    return (
      <div ref={div => (this.Div = div)}>
        <button
          onClick={() =>
            d3
              .select(this.Div)
              .selectAll('*')
              .interrupt()
          }
        >
          停止所有動畫
        </button>
        <button onClick={() => d3.select(this.box3_ref).interrupt()}>
          停止Box3動畫
        </button>
        {/* <button onClick={() => d3.active(this.box3_ref)}>停止Box3動畫</button> */}
        <StyledSvg width={1200} height={1200}>
          {boxes.map((box, i) => {
            const x = i * (100 + 2 * 10) + 10;
            return (
              <StyledRect
                key={box.name}
                x={x}
                width={100}
                height={100}
                bc="#456789"
                strokeWidth={10}
                ref={ref => (this[box.name] = ref)}
              />
            );
          })}
        </StyledSvg>
      </div>
    );
  }
}

export default Basis4;
