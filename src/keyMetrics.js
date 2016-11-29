import React, { Component } from 'react'
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory, DefaultRoute, IndexLink } from 'react-router'
import { LineChart } from 'react-d3-basic'
import BarChart from 'react-bar-chart';

import $ from 'jquery'
import { connect } from 'react-redux'
import { increase, decrease, setTotal, fetchNumberOfOpenIssues, fetchChartData, fetchSuccess } from './actions/count'

const margin = {top: 20, right: 20, bottom: 30, left: 40};

let chartSeries = [
		{
			field: 'Customers',
			name: 'Paying customers per hour',
			color: '#ff7f0e',
			style: {
				"stroke-width": 2,
				"stroke-opacity": .2,
				"fill-opacity": .2
			}
		}
	],
	xBar = function(d) {
		return d.letter;
	},
	xScale = 'ordinal',
	y = function(d) {
		return +d;
	},
	yTicks = [10, "%"];

let x = function(d) {
	return d.index;
}

let total;

function keyMetrics({ number, increase, decrease, setTotal, fetchNumberOfOpenIssues, fetchSuccess, fetchChartData, lineChartData, barChartData }) {

	setInterval(function() {
		fetchNumberOfOpenIssues();
		fetchChartData();
	}, 5000)

  return (
    <div>
				<div id="keyMetricsWrapper">
					<div id="numberOfOpenIssues">Open Issues: { number }</div>
					{
							<div id="lineWrapper">
								<LineChart
									width= {472}
									height= {200}
									data= {lineChartData}
									chartSeries= {chartSeries}
									x= {x} />
							</div>
					}

					{
							<div id="barWrapper">
								<BarChart ylabel='Reported Issues'
									width={345}
									height={300}
									margin={margin}
									data={barChartData} />
							</div>
					}

			</div>
    </div>
  )
}

export default connect(
  state => ({ number: state.keyMetricsReducer.number, lineChartData: state.keyMetricsReducer.lineChartData, barChartData: state.keyMetricsReducer.barChartData }),
  { increase, decrease, setTotal, fetchNumberOfOpenIssues, fetchSuccess, fetchChartData }
)(keyMetrics)
