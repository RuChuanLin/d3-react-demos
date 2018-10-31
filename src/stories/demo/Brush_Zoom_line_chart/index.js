import React, { Component } from 'react';
import './style.css';
import * as d3 from 'd3';
import styled from 'styled-components';
import markdown from './README.md';
import rawData from './data.json';

const Svg = styled.svg`
  cursor: move;
  fill: none;
  pointer-events: all;
`;

class BrushZoomLineChart extends Component {
  constructor(props) {
    super(props);
    this.svgRef = React.createRef();
    this.lineRef = React.createRef();
    this.state = {
      svgHeight: 500,
      svgWidth: 960,
      pathHeight: 0,
      brushHeight: 0,
      pathWidth: 0,
      svgMargin: { top: 20, right: 20, bottom: 110, left: 40 },
      brushMargin: { top: 430, right: 20, bottom: 30, left: 40 }
    };
  }
  componentWillMount() {
    const { svgWidth, svgHeight, svgMargin, brushMargin } = this.state;
    this.setState({
      pathWidth: svgWidth - svgMargin.left - svgMargin.right,
      pathHeight: svgHeight - svgMargin.top - svgMargin.bottom,
      brushHeight: svgHeight - brushMargin.top - brushMargin.bottom
    });
  }
  componentDidMount() {
    const {
      pathHeight,
      pathWidth,
      brushHeight,
      svgMargin,
      brushMargin
    } = this.state;
    const svg = d3.select(this.svgRef);
    const parseDate = d3.timeParse('%m/%d/%Y %H:%M');
    const [xScale, yScale, xScale2, yScale2] = [
      d3.scaleTime().range([0, pathWidth]),
      d3.scaleLinear().range([pathHeight, 0]),
      d3.scaleTime().range([0, pathWidth]),
      d3.scaleLinear().range([brushHeight, 0])
    ];
    const [xAxis, xAxis2, yAxis] = [
      d3.axisBottom(xScale),
      d3.axisBottom(xScale2),
      d3.axisLeft(yScale)
    ];

    const brush = d3
      .brushX()
      .extent([[0, 0], [pathWidth, brushHeight]])
      .on('brush end', brushed);

    const zoom = d3
      .zoom()
      .scaleExtent([1, Infinity])
      .translateExtent([[0, 0], [pathWidth, brushHeight]])
      .extent([[0, 0], [pathWidth, brushHeight]])
      .on('zoom', zoomed);
    const line = d3
      .line()
      .x(d => xScale(d.Date))
      .y(({ Air_Temp }) => yScale(Air_Temp));

    const line2 = d3
      .line()
      .x(d => xScale2(d.Date))
      .y(({ Air_Temp }) => yScale2(Air_Temp));

    const clip = svg
      .append('defs')
      .append('svg:clipPath')
      .attr('id', 'clip')
      .append('svg:rect')
      .attr('width', pathWidth)
      .attr('height', pathHeight)
      .attr('x', 0)
      .attr('y', 0);
    const lineChart = svg
      .append('g')
      .attr('class', 'focus')
      .attr('transform', `translate(${svgMargin.left}, ${svgMargin.top})`)
      .attr('clip-path', 'url(#clip)');

    const focus = svg
      .append('g')
      .attr('class', 'focus')
      .attr('transform', `translate(${svgMargin.left}, ${svgMargin.top})`);

    const context = svg
      .append('g')
      .attr('class', 'context')
      .attr('transform', `translate(${brushMargin.left}, ${brushMargin.top})`);
    console.log(rawData);
    const data = rawData.map(d => {
      // console.log(d.Date);
      d.Date = parseDate(d.Date);
      // console.log(d.Date);
      d.Air_Temp = +d.Air_Temp;
      return d;
    });
    xScale.domain(d3.extent(data, d => d.Date));
    yScale.domain([0, d3.max(data, ({ Air_Temp }) => Air_Temp)]);
    xScale2.domain(xScale.domain());
    yScale2.domain(yScale.domain());

    focus
      .append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', `translate(0, ${pathHeight})`)
      .call(xAxis);
    focus
      .append('g')
      .attr('class', 'axis axis--y')
      .call(yAxis);

    lineChart
      .append('path')
      .datum(data)
      .attr('class', 'line')
      .attr('d', line);

    context
      .append('path')
      .datum(data)
      .attr('class', 'line')
      .attr('d', line2);
    context
      .append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + brushHeight + ')')
      .call(xAxis2);

    context
      .append('g')
      .attr('class', 'brush')
      .call(brush)
      .call(brush.move, xScale.range());

    svg
      .append('rect')
      .attr('class', 'zoom')
      .attr('width', pathWidth)
      .attr('height', pathHeight)
      .attr(
        'transform',
        'translate(' + svgMargin.left + ',' + svgMargin.top + ')'
      )
      .call(zoom);

    function brushed() {
      if (d3.event.sourceEvent && d3.event.sourceEvent.type === 'zoom') return;
      /**
       * s是陣列, 在程式執行初期, 因為尚未觸發brush, 會先使用xScale2的range()方法
       * 回傳例子: [0, 900]
       * 當觸發brush event時, d3.event內會有一個屬性: selection
       * selection為一陣列, 回傳目前brush選取的範圍
       * 回傳例子: [100, 800]
       * 我們就是要用這個selection來處理選取範圍
       */
      const s = d3.event.selection || xScale2.range();
      /**
       * s.map(xScale2.invert, xScale2)是javascript的陣列方法, 其內兩個參數都是函式
       * 根據官方說法, 第二個函式可以當成第一個函式內部的this
       * 總之, 這個函式處理完會回傳一個日期陣列
       * [date1, date2]
       * 再讓xScale去更新domain
       */
      xScale.domain(s.map(xScale2.invert, xScale2));
      lineChart.select('.line').attr('d', line);
      focus.select('.axis--x').call(xAxis);
      svg
        .select('.zoom')
        .call(
          zoom.transform,
          d3.zoomIdentity.scale(pathWidth / (s[1] - s[0])).translate(-s[0], 0)
        );
    }

    function zoomed() {
      if (d3.event.sourceEvent && d3.event.sourceEvent.type === 'brush') return; // ignore zoom-by-brush
      var t = d3.event.transform;
      xScale.domain(t.rescaleX(xScale2).domain());
      lineChart.select('.line').attr('d', line);
      focus.select('.axis--x').call(xAxis);
      context
        .select('.brush')
        .call(brush.move, xScale.range().map(t.invertX, t));
    }
  }
  render() {
    const { svgHeight, svgWidth } = this.state;
    return (
      <Svg
        ref={ref => (this.svgRef = ref)}
        height={svgHeight}
        width={svgWidth}
      />
    );
  }
}

export default [
  'Brush & Zoom line chart',
  () => <BrushZoomLineChart />,
  {
    notes: { markdown }
  }
];
