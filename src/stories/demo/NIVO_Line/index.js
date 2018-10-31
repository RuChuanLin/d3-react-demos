import React, { Component } from 'react';
import './style.css';
import * as d3 from 'd3';
import styled from 'styled-components';
import markdown from './README.md';
import rawDataset from './data.json';

const Svg = styled.svg`
  fill: none;
  pointer-events: all;
`;

const Wrapper = styled.div`
  height: ${props => props.height}px;
  width: ${props => props.width}px;
  border: 1px solid #321325;
  border-radius: 1rem;
  background: rgba(0, 0, 0, 0.5);
`;

class NivoLine extends Component {
  constructor(props) {
    super(props);
    this.svgRef = React.createRef();
    this.foRef = React.createRef();
    this.state = {
      svgHeight: 500,
      svgWidth: 960,
      height: 0,
      width: 0,
      margin: { top: 30, right: 50, bottom: 20, left: 40 },
      tooltipHeight: 450,
      tooltipWidth: 300
    };
  }
  componentWillMount() {
    const { svgWidth, svgHeight, margin } = this.state;
    this.setState({
      width: svgWidth - margin.left - margin.right,
      height: svgHeight - margin.top - margin.bottom
    });
  }
  componentDidMount() {
    const { height, width, margin, tooltipWidth, tooltipHeight } = this.state;
    const svg = d3.select(this.svgRef);
    const parseDate = d3.timeParse('%m/%d/%Y %H:%M');

    const [xScale, yScale] = [
      d3.scaleTime().range([0, width]),
      d3.scaleLinear().range([height, 0])
    ];
    const [xAxis, yAxis] = [d3.axisBottom(xScale), d3.axisLeft(yScale)];

    const line = d3
      .line()
      .x(({ x }) => xScale(x))
      .y(({ y }) => yScale(y));

    const clip = svg
      .append('defs')
      .append('svg:clipPath')
      .attr('id', 'clip')
      .append('svg:rect')
      .attr('width', width)
      .attr('height', height)
      .attr('x', 0)
      .attr('y', 0);

    // const wrapper = svg
    //   .append('g')
    //   .attr('transform', `translate(${[margin.left, margin.top]})`);
    const pointGroup = svg
      .append('g')
      .attr('class', 'focus')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .attr('clip-path', 'url(#clip)');

    const lineChart = svg
      .append('g')
      .attr('class', 'focus')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .attr('clip-path', 'url(#clip)');

    const rectGroup = svg
      .append('g')
      .attr('class', 'focus')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .attr('clip-path', 'url(#clip)');

    const focus = svg
      .append('g')
      .attr('class', 'focus')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const data = rawDataset.map(dataset => ({
      ...dataset,
      data: dataset.data.map(d => ({ ...d, x: parseDate(d.x) }))
    }));
    const firstData = data[0].data;
    xScale.domain(d3.extent(firstData, ({ x }) => x));
    yScale.domain([0, 300]);

    focus
      .append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', `translate(0, ${height})`)
      .call(xAxis);
    focus
      .append('g')
      .attr('class', 'axis axis--y')
      .call(yAxis);
    data.forEach(({ id, color, data }) => {
      lineChart
        .append('path')
        .datum(data)
        .attr('class', 'line')
        .style('stroke', color)
        .attr('d', line);
      data.forEach(({ x, y }) => {
        pointGroup
          .append('circle')
          .attr('fill', color)
          .attr('r', 3)
          .attr('cx', xScale(x))
          .attr('cy', yScale(y));
      });
    });

    // lineChart.on('mousemove', () => {
    //   const { offsetX, offsetY } = d3.event;
    //   console.log(offsetX, offsetY);
    //   d3.select(this.foRef)
    //     .attr('x', offsetX)
    //     .attr('x', offsetY);
    // });

    const dataLength = firstData.length - 1;
    const rectWidth = width / dataLength;

    const xLine = rectGroup
      .append('path')
      .attr('class', 'x-line')
      .attr('opacity', 0.5);

    firstData.forEach((d, i) => {
      rectGroup
        .append('rect')
        .attr('width', rectWidth)
        .attr('height', height)
        .attr('x', i * rectWidth - rectWidth / 2)
        .on('mouseover', () => {
          xLine.attr('d', line([{ x: d.x, y: 0 }, { x: d.x, y: height }]));
        })
        .on('mousemove', () => {
          const { offsetX, offsetY } = d3.event;
          const leftMargin = offsetX - margin.left - tooltipWidth / 2;
          const rightMargin = offsetX + margin.right + margin.left;
          let x = margin.left;
          if (offsetX > width + margin.left - tooltipWidth / 2) {
            x = width + margin.left - tooltipWidth;
          } else if (leftMargin > 0) {
            x = offsetX - tooltipWidth / 2;
          }
          d3.select(this.foRef)
            .attr('x', x)
            .attr('y', (height - tooltipHeight) / 2)
            .attr('opacity', 0.8);
          svg.selectAll('foreignObject');
        })
        .on('mouseout', () => {
          d3.select(this.foRef).attr('opacity', 0);
        })
        .on('click', () => {
          console.log(d3.event.offsetX);
        });
    });
  }
  render() {
    const { svgHeight, svgWidth, tooltipHeight, tooltipWidth } = this.state;
    return (
      <Svg ref={ref => (this.svgRef = ref)} height={svgHeight} width={svgWidth}>
        <foreignObject ref={ref => (this.foRef = ref)} opacity={0}>
          <Wrapper width={tooltipWidth} height={tooltipHeight}>
            {rawDataset.map(({ id, color, data }) => {
              console.log(data);
              return (
                <div>
                  <h3 style={{ color: 'white' }}>{id}</h3>
                </div>
              );
            })}
          </Wrapper>
        </foreignObject>
      </Svg>
    );
  }
}

export default [
  'NIVO線圖',
  () => <NivoLine />,
  {
    notes: { markdown }
  }
];
