import App from './App';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory, DefaultRoute, IndexLink } from 'react-router'

const Container = (props) => <div>
  <Nav />
  {props.children}
</div>

const Home = () => <h1>Hello from Home!</h1>
const NotFound = () => <h1>404.. This page is not found!</h1>

const Nav = () => (
  <div id="links">
    <IndexLink onlyActiveOnIndex activeStyle={{color:'#53acff'}} activeClassName='active' to='/geospatial'>Geospatial</IndexLink>&nbsp;
    <IndexLink onlyActiveOnIndex activeStyle={{color:'#53acff'}} activeClassName='active' to='/keyMetrics'>Key Metrics</IndexLink>&nbsp;
    <IndexLink onlyActiveOnIndex activeStyle={{color:'#53acff'}} activeClassName='active' to='/dataView'>Data View</IndexLink>&nbsp;
  </div>
)

import geospatialRoute from './geospatial'
import keyMetricsRoute from './keyMetrics'
import dataViewRoute from './dataView'

const router = (<Router history={browserHistory}>
      <Route path='/' component={Container}>
        <IndexRoute component={Home} />
        {geospatialRoute}
        {keyMetricsRoute}
        {dataViewRoute}
        <Route path='*' component={NotFound} />
      </Route>
    </Router>);

render(router, document.getElementById('root'));

store.subscribe(render)
