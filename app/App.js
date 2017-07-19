
import React, { Component } from 'react';
import { render } from 'react-dom';


import Child from './Child';


// localStorage.setItem("access", false);

class App extends Component {

  constructor() {
    super(...arguments);
    this.state = {
      route: window.location.hash.substr(1),
      access: false
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        route: window.location.hash.substr(1)
      });
    });
  }

  changeAccess(value) {
    console.log(`App: ${value}`);
    // localStorage.setItem("access", value);
    this.setState({
      access: value
    });
  }

  render() {
    return (
      <div className="container">
        <header>App</header>
        <menu>
          <ul>
            <li><a className="btn btn-default" href="#/">Home</a></li>
            <li style={{ display: this.state.access ? 'none' : 'inline-block' }}>
              <a className="btn btn-default" href="#/registration">Registration</a>
            </li>
            <li style={{ display: this.state.access ? 'none' : 'inline-block' }}>
              <a className="btn btn-default" href="#/login">Login</a>
            </li>
            <li style={{ display: this.state.access ? 'inline-block' : 'none' }}>
              <a className="btn btn-default" href="#/users">Users</a>
            </li>
            <li style={{ display: this.state.access ? 'inline-block' : 'none' }}>
              <button className="btn btn-default" type="button" 
              onClick={this.changeAccess.bind(this, false)}>Exit</button>
            </li>
          </ul>
        </menu>
        <Child route={this.state.route}
          access={this.state.access}
          onchangeAccess={this.changeAccess.bind(this)}
        />
      </div>
    )
  }
}

render(<App />, document.getElementById('root'));