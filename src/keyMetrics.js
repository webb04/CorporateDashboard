import React, { Component } from 'react'
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory, DefaultRoute, IndexLink } from 'react-router'
import { LineChart } from 'react-d3-basic'
import BarChart from 'react-bar-chart';

import $ from 'jquery'
import { connect } from 'react-redux'
import { increase, decrease, setTotal } from './actions/count'

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

let lineChartData;
let barChartData;

function keyMetrics({ number, increase, decrease, setTotal }) {

	let fetchNumberOfOpenIssues = setInterval(function(){
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
	    }
	  });
	}, 1000);

	(function(){
		fetch('src/data/keyMetricsChartData.json')
		.then(function(response){
			return response.json();
		}).then(function(response) {
			lineChartData = response.line;
			barChartData = response.bar;
		})
	})();

  return (
    <div>
				<div id="keyMetricsWrapper">
					<div id="numberOfOpenIssues">Open Issues: { number }</div>
					<button className="decrease" onClick={() => decrease(1)}>Decrease</button>
					&nbsp;&nbsp;
					<button onClick={() => increase(1)}>Increase</button>
					{
						lineChartData ?
							<div id="lineWrapper">
								<LineChart
									width= {472}
									height= {200}
									data= {lineChartData}
									chartSeries= {chartSeries}
									x= {x} />
							</div>
						:
							null
					}

					{
						barChartData ?
							<div id="barWrapper">
								<BarChart ylabel='Reported Issues'
									width={345}
									height={300}
									margin={margin}
									data={barChartData} />
							</div>
						:
							null
					}

			</div>
    </div>
  )
}

export default connect(
  state => ({ number: state.keyMetricsReducer.number }),
  { increase, decrease, setTotal }
)(keyMetrics)
