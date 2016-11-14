import { INCREASE, DECREASE, SET_TOTAL } from '../constants'

const initialState = {
  number: 1
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
  return state
}
