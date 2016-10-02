import App from './App';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory, DefaultRoute, IndexLink } from 'react-router'
import geospatial from './geospatial'
import keyMetrics from './keyMetrics'
import dataView from './dataView'

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

const Title = () => (
  <h1>Hello from Title Component</h1>
)

const SubTitle = () => (
  <h1>Hello from SubTitle Component</h1>
)

const router = (<Router history={browserHistory}>
      <Route path='/' component={Container}>
        <IndexRoute component={Home} />
        <Route path='/keyMetrics(/:name)' component={keyMetrics} name="Jamie"/>
        <Route className="" path='/geospatial' component={geospatial}/>
        <Route path='/dataView' component={dataView}>
          <IndexRoute components={{ title: Title, subTitle: SubTitle }} />
        </Route>
        <Route path='*' component={NotFound} />
      </Route>
    </Router>);

render(router, document.getElementById('root'));

// store.subscribe(render)
