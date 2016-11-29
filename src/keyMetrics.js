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
				"strokeWidth": 2,
				"strokeOpacity": .8,
				"fillOpacity": .8
			}
		}
	];


let x = function(d) {
	return d.index;
}

class keyMetrics extends Component {
	componentDidMount() {
		const { fetchNumberOfOpenIssues, fetchChartData } = this.props
		fetchNumberOfOpenIssues();
		fetchChartData();
		this.polling = setInterval(function() {
			fetchNumberOfOpenIssues();
			fetchChartData();
		}, 5000)
	}

	componentWillUnmount() {
		clearInterval(this.polling);
	}

  render() {
		const { number, increase, decrease, setTotal, fetchSuccess, lineChartData, barChartData } = this.props

	  return (
	    <div>
					<div id="keyMetricsWrapper">
						<div id="numberOfOpenIssues">Open Issues: { number }</div>
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
}

export default connect(
  state => ({ number: state.keyMetricsReducer.number, lineChartData: state.keyMetricsReducer.lineChartData, barChartData: state.keyMetricsReducer.barChartData }),
  { increase, decrease, setTotal, fetchNumberOfOpenIssues, fetchSuccess, fetchChartData }
)(keyMetrics)
