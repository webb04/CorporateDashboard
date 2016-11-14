import { INCREASE, DECREASE, SET_TOTAL } from '../constants'

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
