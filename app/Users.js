import React, { Component } from 'react';

import List from './List';

class Users extends Component {
  constructor() {
        super(...arguments);
        this.state = {
            data: []
        };
    }
  //new start
  componentDidMount() {
    console.log(this.state.data);
    $.ajax({
      url:  "https://jsonplaceholder.typicode.com/users",
      dataType: 'json',
      cache: false,
      success: function(data) {
        console.log(data);
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("https://jsonplaceholder.typicode.com/users", status, err.toString());
      }.bind(this)
    });
  }
    render() {
        return (
          <div>
            <h3 className="h3">List of users</h3>
            <List data = {this.state.data} />
          </div>
        );
    }
}
export default Users;