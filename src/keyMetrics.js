import React, { Component } from 'react'
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory, DefaultRoute, IndexLink } from 'react-router'
import { LineChart } from 'react-d3-basic'
import BarChart from 'react-bar-chart';

import $ from 'jquery'
import { connect } from 'react-redux'
import { increase, decrease, setTotal } from './actions/count'

var data = [
	{
		"Customers": 39,
		"index": 9
	},
	{
		"Customers": 38,
		"index": 10
	},
	{
		"Customers": 34,
		"index": 11
	},
	{
		"Customers": 8,
		"index": 12
	},
	{
		"Customers": 12,
		"index": 13
	},
	{
		"Customers": 12,
		"index": 14
	},
	{
		"Customers": 14,
		"index": 15
	},
	{
		"Customers": 10,
		"index": 16
	},
	{
		"Customers": 23,
		"index": 17
	},
	{
		"Customers": 19,
		"index": 18
	}
];

const dataBar = [
	{text: '9:00', value: 8},
	{text: '10:00', value: 9},
	{text: '11:00', value: 4},
	{text: '12:00', value: 5},
	{text: '13:00', value: 1},
	{text: '14:00', value: 11},
	{text: '15:00', value: 9},
	{text: '16:00', value: 1},
	{text: '17:00', value: 3},
	{text: '18:00', value: 15}
];

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

function keyMetrics({ number, increase, decrease, setTotal }) {

	let fetchData = setInterval(function(){
	  $.ajax({
	   type: "GET",
	   url: "src/data/keyMetrics.csv",
	   dataType: "text",
	   success: function(allText) {
	     var trimmedText = allText.replace(/\s+/g, ',').trim().split(',');
	     var total = 0;
	     trimmedText.map(x => {
	       x = parseInt(x);
	       if (typeof x === 'number' && !isNaN(x)) {
	         total += x;
	      }
	     });
	    setTotal(total);
			clearInterval(fetchData);
	    }
	  });
	}, 5000);

  return (
    <div>
				<div id="keyMetricsWrapper">
					<div id="numberOfOpenIssues">Open Issues: { number }</div>
					<button onClick={() => decrease(1)}>Decrease</button>
					&nbsp;&nbsp;
					<button onClick={() => increase(1)}>Increase</button>
					<div id="lineWrapper">
						<LineChart
							width= {700}
							height= {300}
							data= {data}
							chartSeries= {chartSeries}
							x= {x} />
					</div>
					<div id="barWrapper">
						<BarChart ylabel='Reported Issues'
							width={580}
							height={500}
							margin={margin}
							data={dataBar} />
					</div>
			</div>
    </div>
  )
}

export default connect(
  state => ({ number: state.keyMetricsReducer.number }),
  { increase, decrease, setTotal }
)(keyMetrics)
