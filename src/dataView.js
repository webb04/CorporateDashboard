import React, { Component } from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory, DefaultRoute, IndexLink } from 'react-router';
import OpenIssues from './keyMetricsComponents/OpenIssues';
import ReportedIssues from './keyMetricsComponents/ReportedIssues';
import PayingCustomers from './keyMetricsComponents/PayingCustomers';

class dataView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleIssues: [],
      submissionTimestampHover: false,
      customerNameHover: false,
      emailAdressHover: false,
      descriptionHover: false,
      statusHover: false,
      closedTimestampHover: false,
      employeeNameHover: false
    };
  }

  componentDidMount() {
    this.setState({ visibleIssues: []});
    var that = this;
    fetch('/src/data/issues.json')
      .then(function(response) {
         return response.json();
      }).then(function(response) {
        that.setState({ visibleIssues: response, originalIssues: response});
      });
  }

  handleInput(event) {
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

  submissionTimestampHover(leave = null) {
    if (leave) this.setState({submissionTimestampHover: false});
    this.setState({submissionTimestampHover: !this.state.submissionTimestampHover});
  }

  customerNameHover(leave = null) {
    if (leave) this.setState({customerNameHover: false});
    this.setState({customerNameHover: !this.state.customerNameHover});
  }

  emailAdressHover(leave = null) {
    if (leave) this.setState({emailAdressHover: false});
    this.setState({emailAdressHover: !this.state.emailAdressHover});
  }

  descriptionHover(leave = null) {
    if (leave) this.setState({descriptionHover: false});
    this.setState({descriptionHover: !this.state.descriptionHover});
  }

  statusHover(leave = null) {
    if (leave) this.setState({statusHover: false});
    this.setState({statusHover: !this.state.statusHover});
  }

  closedTimestampHover(leave = null) {
    if (leave) this.setState({closedTimestampHover: false});
    this.setState({closedTimestampHover: !this.state.closedTimestampHover});
  }

  employeeNameHover(leave = null) {
    if (leave) this.setState({employeeNameHover: false});
    this.setState({employeeNameHover: !this.state.employeeNameHover});
  }

  filterColumn(columnName) {
    let newArray = this.state.visibleIssues;
    if ((columnName == "submissionTimestamp") || (columnName == "closedTimestamp")) {
      newArray.sort(function(a, b) {
        return new Date(a[columnName]) - new Date(b[columnName])
      })
    } else {
      newArray.sort(function(a, b) {
        return a[columnName].localeCompare(b[columnName]);
      })
    }

    if (this.state[columnName] == "ascending") {
      newArray.reverse();
      this.setState({[columnName] : "descending"});
    } else {
      this.setState({[columnName] : "ascending"});
    }

    this.setState({"visibleIssues" : newArray});
  }


  render() {
    return (
      <div className="table-container">
        <div className="input-container">
          <input type="text" placeholder="Search for an issue" value={this.state.searchInput} onChange={ this.handleInput.bind(this) }/>
        </div>
        <table>
          <thead>
            <th onMouseOver={ this.submissionTimestampHover.bind(this) } onMouseLeave={ this.submissionTimestampHover.bind(this, "leave") } onClick={ this.filterColumn.bind(this, "submissionTimestamp") }>
              { this.state.submissionTimestampHover ? <span className="hover">Filter</span> : "Submission Timestamp" }
            </th>
            <th onMouseOver={ this.customerNameHover.bind(this) } onMouseLeave={ this.customerNameHover.bind(this, "leave") } onClick={ this.filterColumn.bind(this, "customerName") }>
              { this.state.customerNameHover ? <span className="hover">Filter</span> : "Customer Name" }
            </th>
            <th onMouseOver={ this.emailAdressHover.bind(this) } onMouseLeave={ this.emailAdressHover.bind(this, "leave") } onClick={ this.filterColumn.bind(this, "customerEmailAddress") }>
              { this.state.emailAdressHover ? <span className="hover">Filter</span> : "Customer Email Address" }
            </th>
            <th onMouseOver={ this.descriptionHover.bind(this) } onMouseLeave={ this.descriptionHover.bind(this, "leave") } onClick={ this.filterColumn.bind(this, "description") }>
              { this.state.descriptionHover ? <span className="hover">Filter</span> : "Description" }
            </th>
            <th onMouseOver={ this.statusHover.bind(this) } onMouseLeave={ this.statusHover.bind(this, "leave") } onClick={ this.filterColumn.bind(this, "open") }>
              { this.state.statusHover ? <span className="hover">Filter</span> : "Status" }
            </th>
            <th onMouseOver={ this.closedTimestampHover.bind(this) } onMouseLeave={ this.closedTimestampHover.bind(this, "leave") } onClick={ this.filterColumn.bind(this, "closedTimestamp") }>
              { this.state.closedTimestampHover ? <span className="hover">Filter</span> : "Closed Timestamp" }
            </th>
            <th onMouseOver={ this.employeeNameHover.bind(this) } onMouseLeave={ this.employeeNameHover.bind(this, "leave") } onClick={ this.filterColumn.bind(this, "employeeName") }>
              { this.state.employeeNameHover ? <span className="hover">Filter</span> : "Employee Name" }
            </th>
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

export default dataView;
