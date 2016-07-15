import React, { Component } from 'react'
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory, DefaultRoute, IndexLink } from 'react-router'

const keyMetrics = (props) => (
  <div>
    <h3>Welcome to the keyMetrics Page</h3>
    { props.params.name && <h2>Hello, {props.params.name}</h2>}
  </div>
)

const keyMetricsRoute = (<Route path='/keyMetrics(/:name)' component={keyMetrics} />)

export default keyMetricsRoute;
