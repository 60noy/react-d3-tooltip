"use strict";

import {
  default as React,
  Component,
  PropTypes,
} from 'react';

import {
  default as TooltipSet
} from '../inherit/index';

import {
  series as series,
  AreaStackChart as AreaStackChart
} from 'react-d3-basic';

import {
  default as Voronoi
} from '../utils/voronoi';

import {
  isTooltipUpdate
} from '../utils/tooltipUpdate';


export default class AreaStackContainer extends TooltipSet {

  constructor(props) {
    super(props);

    const {
      margins,
      width,
      height
    } = this.props;

    this.state = {
      xRange: this.props.xRange || [0, width - margins.left - margins.right],
      yRange: this.props.yRange || [height - margins.top - margins.bottom, 0],
      xRangeRoundBands: this.props.xRangeRoundBands || {interval: [0, width - margins.left - margins.right], padding: .1}
    }

    this.mkXDomain();
    this.mkYDomain(true);
    this.mkXScale(this.setXDomain);
    this.mkYScale(this.setYDomain);
    this.mkSeries();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !isTooltipUpdate(nextProps, nextState, this);
  }

  render() {
    const xScaleSet = this.setXScale;
    const yScaleSet = this.setYScale;
    const chartSeriesData = this.setSeries;

    const {
      onMouseOut,
      onMouseOver
    } = this.props;

    var voronoi = (<Voronoi
      {...this.props}
      xScaleSet= {xScaleSet}
      yScaleSet= {yScaleSet}
      dataset= {chartSeriesData}
      stack={true}
      onMouseOver= {onMouseOver}
      onMouseOut= {onMouseOut}
      />)

    return (
      <g>
        <AreaStackChart {...this.props}/>
        {voronoi}
      </g>
    )
  }
}
