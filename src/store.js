import { createStore, compose } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';

import rootReducer from './reducers/index';
import locations from './data/employeeLocations'
import issues from './data/issues'

const defaultState = {
  locations,
  issues
}

const store = createStore(rootReducer, defaultState);
export const history = syncHistoryWithStore(browserHistory, store);

export default store;
