import React, { Component } from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory, DefaultRoute, IndexLink } from 'react-router';
import OpenIssues from './keyMetricsComponents/OpenIssues';
import ReportedIssues from './keyMetricsComponents/ReportedIssues';
import PayingCustomers from './keyMetricsComponents/PayingCustomers';

const keyMetrics = (props) => (
  <div>
    <h3>Welcome to the keyMetrics Page</h3>
    <h2>Hello, {props.route.name}</h2>
    <OpenIssues/>
    <PayingCustomers/>
    <ReportedIssues/>
  </div>
)

const keyMetricsRoute = (<Route path='/keyMetrics(/:name)' component={keyMetrics} name="Jamie"/>)

export default keyMetricsRoute;
