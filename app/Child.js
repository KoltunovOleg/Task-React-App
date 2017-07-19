import React, { Component } from 'react';

import Registration from './Registration';
import Home from './Home';
import Login from './Login';
import Users from './Users';


class Child extends Component {

    render() {
      var Render;
      if(this.props.route && this.props.access){
        switch (this.props.route) {
            case '/users':
                Render = <Users />;
                break;
            default:
                Render = <Home />;
        }}else{
          switch (this.props.route) {
            case '/registration':
                Render = <Registration onchangeAccess={this.props.onchangeAccess}/>;
                break;
            case '/login':
                Render = <Login onchangeAccess={this.props.onchangeAccess}/>;
                break;
            default:
                Render = <Home />;
          }
        }
        
        return (
            <div className="col-md-8">
              {Render}
            </div>
        );
    }
}
export default Child;