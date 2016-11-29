import { INCREASE, DECREASE, SET_TOTAL, OPEN_ISSUES, FETCH_CHART_SUCCESS, FETCH_SUCCESS } from '../constants'
import $ from 'jquery'

export function increase(n) {
  return {
    type: INCREASE,
    amount: n
  }
}

export function decrease(n) {
  return {
    type: DECREASE,
    amount: n
  }
}

export function setTotal(n) {
  return {
    type: SET_TOTAL,
    amount: n
  }
}

export function fetchNumberOfOpenIssues() {
  return function(dispatch) {
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
       dispatch({ type: FETCH_SUCCESS, amount: total });
      }
    });
  }
}

export function fetchChartData() {
  return function(dispatch) {
    $.get('src/data/keyMetricsChartData.json', function(result) {
     dispatch({ type: FETCH_CHART_SUCCESS, lineChartData: result.line, barChartData: result.bar  });
   })
  }
}
