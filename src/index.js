import App from './App';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory, DefaultRoute, IndexLink } from 'react-router'
import geospatial from './geospatial'
import keyMetrics from './keyMetrics'
import dataView from './dataView'

import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { createStore, combineReducers } from 'redux'

import { Provider } from 'react-redux'
import keyMetricsReducer from './reducers/keyMetricsReducer'

const reducer = combineReducers({
  keyMetricsReducer,
  routing: routerReducer
})

const store = createStore(reducer);

const Container = (props) => <div>
  <Nav />
  {props.children}
</div>

const Home = () => <h1 className="home-title">Corporate Dashboard</h1>
const NotFound = () => <h1>404.. This page is not found!</h1>

const Nav = () => (
  <div id="links">
    <IndexLink onlyActiveOnIndex activeStyle={{color:'#53acff'}} activeClassName='active' to='/geospatial'>Geospatial</IndexLink>&nbsp;
    <IndexLink onlyActiveOnIndex activeStyle={{color:'#53acff'}} activeClassName='active' to='/keyMetrics'>Key Metrics</IndexLink>&nbsp;
    <IndexLink onlyActiveOnIndex activeStyle={{color:'#53acff'}} activeClassName='active' to='/dataView'>Data View</IndexLink>&nbsp;
  </div>
)

const Title = () => (
  <h1>Hello from Title Component</h1>
)

const SubTitle = () => (
  <h1>Hello from SubTitle Component</h1>
)

const history = syncHistoryWithStore(browserHistory, store)

const router = (
    <Provider store={store}>
      <div>
        <Router history={history}>
          <Route path='/' component={Container}>
            <IndexRoute component={Home} />
            <Route path='/keyMetrics(/:name)' component={keyMetrics} name="Jamie"/>
            <Route className="" path='/geospatial' component={geospatial}/>
            <Route path='/dataView' component={dataView}/>
            <Route path='*' component={NotFound} />
          </Route>
        </Router>
      </div>
    </Provider>
  );

render(router, document.getElementById('root'));
