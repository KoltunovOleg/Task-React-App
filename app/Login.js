import React, { Component } from 'react';

//It is get to email & pass from localstorage
function getDataUser(email, pass) {
  let retrievedObject = localStorage.getItem(email);
  if (retrievedObject) {
    let pars = JSON.parse(retrievedObject);
    return toCompare(pass, pars.pass);
  } else {
    alert('Such a login does not exist. Try again please.');
    return false;
  }
}
//It is compare have entered & have gotten from storage
function toCompare(...args) {
  console.log(args)
  if (args[0] === args[1]) {
    return true;
  } else {
    alert('Invalid password. Try again please.');
    return false;
  }
}

class Login extends Component {


  handleSubmit(event) {
    let email = event.target.email.value,
      pass = event.target.pass.value,
      getdata = getDataUser(email, pass);
    this.props.onchangeAccess(getdata);
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <h3 className="h3">Login</h3>
        <form className="regForm" onSubmit={this.handleSubmit.bind(this)}>
          {/** 
        *Почему без bind(this) не срабатывала передача
        *this.props.onchangeAccess(getdata) в родителя?!
        */}
          <div className="form-group">
            <input className="form-control" name="email" type="mail" placeholder="Email" />
          </div>
          <div className="form-group">
            <input className="form-control" name="pass" type="password" placeholder="Password" />
          </div>
          <button className="btn btn-default" type="submit">Login</button>
        </form>
      </div>
    )
  }
}
export default Login;