import React, { Component } from 'react'
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory, DefaultRoute, IndexLink } from 'react-router'

const Query = (props) => (
  <h2>{props.location.query.message}</h2>
)

const Instagram = () => <h3>Instagram Feed</h3>
const TwitterFeed = () => <h3>Twitter Feed</h3>

const geospatial = (props) => <div>
  <br />
  <Link onlyActiveOnIndex activeStyle={{color:'#53acff'}} to='/geospatial'>Twitter Feed</Link>&nbsp;
  <Link onlyActiveOnIndex activeStyle={{color:'#53acff'}} to='/geospatial/instagram'>Instagram Feed</Link>
  <h1>We are located at 555 Jackson St.</h1>
  {props.children}
</div>

const geospatialRoute = (<Route className="" path='/geospatial' component={geospatial}>
  <IndexRoute component={TwitterFeed} />
  <Route path='instagram' component={Instagram} />
  <Route path='query' component={Query} />
</Route>)

export default geospatialRoute;
