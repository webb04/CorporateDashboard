import React, { Component } from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory, DefaultRoute, IndexLink } from 'react-router';
import OpenIssues from './keyMetricsComponents/OpenIssues';
import ReportedIssues from './keyMetricsComponents/ReportedIssues';
import PayingCustomers from './keyMetricsComponents/PayingCustomers';

class keyMetrics extends Component {
  constructor(props) {
    super(props);
    this.state = { visibleIssues: []};
  }

  componentDidMount() {
    this.setState({ visibleIssues: []});
    var that = this;
    fetch('http://localhost:3000/src/data/issues.json')
      .then(function(response) {
         return response.json();
      }).then(function(response) {
        console.log(response);
        that.setState({ visibleIssues: response, originalIssues: response});
      });
  }

  handleInput(event) {
    console.log(event.target.value);
    this.setState({searchInput: event.target.value});

    const originalIssues = this.state.originalIssues;

    let newVisibleIssues = [];
    originalIssues.forEach(issue => {
        const keys = Object.keys(issue);
        const contained = keys.forEach(key => {
          if (issue[key].toLowerCase().indexOf(event.target.value.toLowerCase()) != -1) {
            newVisibleIssues.push(issue);
          }
        });
     });

    this.setState({visibleIssues: newVisibleIssues});
  }

  timestampHover() {
    console.log("Over biatch");
  }

  render() {
    return (
      <div className="table-container">
        <div className="input-container">
          <input type="text" placeholder="Search for an issue" value={this.state.searchInput} onChange={ this.handleInput.bind(this) }/>
        </div>
        <table>
          <thead>
            <th onMouseOver={ this.timestampHover.bind(this) }>Submission Timestamp</th>
            <th>Customer Name</th>
            <th>Customer Email Address</th>
            <th>Description</th>
            <th>Status</th>
            <th>Closed Timestamp</th>
            <th>Employee Name</th>
          </thead>
          <tbody>
              {
                this.state.visibleIssues.map(issue => {
                  return (
                    <tr>
                      <td> { issue.submissionTimestamp } </td>
                      <td> { issue.customerName } </td>
                      <td className="email"> { issue.customerEmailAddress } </td>
                      <td className="description"> { issue.description } </td>
                      <td> { issue.open } </td>
                      <td> { issue.closedTimestamp } </td>
                      <td> { issue.employeeName } </td>
                    </tr>
                );
                })
              }
        </tbody>
      </table>
      </div>
    )
  }
}

export default keyMetrics;
