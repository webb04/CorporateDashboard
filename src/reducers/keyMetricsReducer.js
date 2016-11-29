import { INCREASE, DECREASE, SET_TOTAL, OPEN_ISSUES, FETCH_CHART_SUCCESS, FETCH_SUCCESS } from '../constants'

const initialState = {
  number: 24,
  lineChartData: [
  	{"text": "9:00", "value": 8},
  	{"text": "10:00", "value": 9},
  	{"text": "11:00", "value": 4},
  	{"text": "12:00", "value": 5},
  	{"text": "13:00", "value": 1},
  	{"text": "14:00", "value": 11},
  	{"text": "15:00", "value": 9},
  	{"text": "16:00", "value": 1},
  	{"text": "17:00", "value": 3},
  	{"text": "18:00", "value": 15}
  ],
  barChartData: [
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
  ]
}

export default function update(state = initialState, action) {
  if(action.type === INCREASE) {
    return { number: state.number + action.amount }
  }
  else if(action.type === DECREASE) {
    return { number: state.number - action.amount }
  }
  else if(action.type === SET_TOTAL) {
    let total = state.number > action.amount ? state.number : action.amount;
    return { number: total }
  }
  else if(action.type === FETCH_SUCCESS) {
    let total = state.number > action.amount ? state.number : action.amount;
    return { number: total }
  }
  else if(action.type === FETCH_CHART_SUCCESS) {
    return { lineChartData: action.lineChartData, barChartData: action.barChartData, number: state.number  }
  }
  return state
}
