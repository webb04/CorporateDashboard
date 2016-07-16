import styles from './app.css';
import React, { Component } from 'react'
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory, DefaultRoute, IndexLink } from 'react-router'

import geospatialRoute from './geospatial'
import keyMetricsRoute from './keyMetrics'
import dataViewRoute from './dataView'

class App extends Component {
  render () {
    return (
      <Router history={browserHistory}>
        <Route path='/' component={Container}>
          <IndexRoute component={Home} />
          {geospatialRoute}
          {keyMetricsRoute}
          {dataViewRoute}
          <Route path='*' component={NotFound} />
        </Route>
      </Router>
    )
  }
}

const Nav = () => (
  <div id="links">
    <IndexLink onlyActiveOnIndex activeStyle={{color:'#53acff'}} activeClassName='active' to='/geospatial'>Geospatial</IndexLink>&nbsp;
    <IndexLink onlyActiveOnIndex activeStyle={{color:'#53acff'}} activeClassName='active' to='/keyMetrics'>Key Metrics</IndexLink>&nbsp;
    <IndexLink onlyActiveOnIndex activeStyle={{color:'#53acff'}} activeClassName='active' to='/dataView'>Data View</IndexLink>&nbsp;
  </div>
)

const Container = (props) => <div>
  <Nav />
  {props.children}
</div>


browserHistory.listen(function(ev) {
  console.log('listen', ev.pathname);
  if (ev.pathname.toString() == "/geospatial") {
    setTimeout(function(){
      var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 51.795027, lng: -0.330963},
        zoom: 8
      });
    }, 100);
  }
});

const Home = () => <h1>Hello from Home!</h1>
const NotFound = () => <h1>404.. This page is not found!</h1>

export default App
