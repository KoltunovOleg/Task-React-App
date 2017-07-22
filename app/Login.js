import React, { Component } from 'react';

//It is get to email & pass from localstorage
function getDataUser(email, pass) {
  let retrievedObject = localStorage.getItem(email);
  if (retrievedObject && !pass) {
    return true;
  }else if(retrievedObject && pass){
    let pars = JSON.parse(retrievedObject);
    return toCompare(pass, pars.pass);
  } 
  else {
    // alert('Such a login does not exist. Try again please.');
    return false;
  }
}
//It is compare have entered & have gotten from storage
function toCompare(...args) {
  console.log(args)
  if (args[0] === args[1]) {
    return true;
  } else {
    // alert('Invalid password. Try again please.');
    return false;
  }
}

class Login extends Component {

    constructor() {
    super(...arguments);
    this.state = {
      validEmail: "",
      validPass: "",
      accessEmail: false,
      accessPass: false,
      glyphiconPass: ""
    };
  }


  handleSubmit(event) {
    let email = event.target.email.value,
      pass = event.target.pass.value;
      if( this.state.accessEmail && this.state.accessPass){
        this.props.onchangeAccess(true);
      } else{
        this.props.onchangeAccess(false);
      }
    event.preventDefault();
  }

  onBlurEmail(event) {
    let value = event.target.value;
    if (!value) {
      this.setState({
        validEmail: "",
        accessEmail: false,
        glyphiconEmail: ""
      });
    } else if (getDataUser(value)) {
      this.setState({
        validEmail: "has-success",
        accessEmail: true,
        glyphiconEmail: "glyphicon-ok"
      });
    } else {
      this.setState({
        validEmail: "has-error",
        accessEmail: false,
        glyphiconEmail: "glyphicon-remove"
      });
    }
  }
  onBlurPass(event) {
    let value = event.target.value;
    if (!value) {
      this.setState({
        validPass: "",
        accessPass: false,
        glyphiconPass: ""
      });
    }else if (getDataUser( this.refs.emailField.value, value)) {
      this.setState({
        validPass: "has-success",
        accessPass: true,
        glyphiconPass: "glyphicon-ok"
      });
    } else {
      this.setState({
        validPass: "has-error",
        accessPass: false,
        glyphiconPass: "glyphicon-remove"
      });
    }
  }

  render() {
    return (
      <div>
        <h3 className="h3">Login</h3>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className={`form-group ${this.state.validEmail} has-feedback`}>
            <input className="form-control" name="email" type="mail" placeholder="Email"
            ref = "emailField"
            onBlur={this.onBlurEmail.bind(this)} />
            <span className={`glyphicon ${this.state.glyphiconEmail} form-control-feedback`} aria-hidden="true"></span>
          </div>
          <div className={`form-group ${this.state.validPass} has-feedback`}>
            <input className="form-control" name="pass" type="password" placeholder="Password"
            onBlur={this.onBlurPass.bind(this)} />
            <span className={`glyphicon ${this.state.glyphiconPass} form-control-feedback`} aria-hidden="true"></span>
          </div>
          <button className="btn btn-default" type="submit">Login</button>
        </form>
      </div>
    )
  }
}
export default Login;