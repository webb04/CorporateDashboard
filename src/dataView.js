import React, { Component } from 'react'
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory, DefaultRoute, IndexLink } from 'react-router'

const Title = () => (
  <h1>Hello from Title Component</h1>
)

const SubTitle = () => (
  <h1>Hello from SubTitle Component</h1>
)

const dataView = (props) => (
	<div>
    {props.title}<br />
    {props.subTitle}
	</div>
)

const dataViewRoute = (<Route path='/dataView' component={dataView}>
  <IndexRoute components={{ title: Title, subTitle: SubTitle }} />
</Route>)

export default dataViewRoute;
