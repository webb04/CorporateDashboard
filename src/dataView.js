import React, { Component } from 'react'
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory, DefaultRoute, IndexLink } from 'react-router'

const dataView = (props) => (
	<div>
    {props.title}<br />
    {props.subTitle}
	</div>
)

export default dataView;
