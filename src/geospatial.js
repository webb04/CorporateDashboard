import React, { Component } from 'react'
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory, DefaultRoute, IndexLink } from 'react-router'

const Query = (props) => (
  <h2>{props.location.query.message}</h2>
)

const Instagram = () => <h3>Instagram Feed</h3>
const TwitterFeed = () => <h3>Twitter Feed</h3>

const geospatial = (props) => <div id="geospatial">
<div id='map'></div>
<div id="capture"></div>
</div>

const geospatialRoute = (<Route className="" path='/geospatial' component={geospatial}/>)

export default geospatialRoute;
