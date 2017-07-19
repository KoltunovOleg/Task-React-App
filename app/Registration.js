import React, { Component } from 'react';

//It is compare pass & pass_confirm
function toCompare(...args) {

  let retrievedObject = localStorage.getItem(args[0]);
  if (retrievedObject) {
    alert('Such login already exists. Try again please.');
    return false;
  } else {
    if (args[1] === args[2]) {
      saveDataUser(args[0], args[1]);
      return true;
    } else {
      alert('Passwords do not match. Try again please.');
      return false;
    }
  }
  console.log(`toCompare: ${args}`)

}

//It is save email & pass to localstorage
function saveDataUser(email, pass){
  let arrDataUser = {pass: pass};
  console.log(arrDataUser);
  localStorage.setItem(email, JSON.stringify(arrDataUser));
}



class Registration extends Component {

  handleSubmit(event) {
    let email= event.target.email.value,
        pass = event.target.pass.value,
        pass_confirm = event.target.pass_confirm.value,
        getdata = toCompare(email, pass, pass_confirm);
        this.props.onchangeAccess(getdata);

        event.preventDefault();
    }

  render(){
    return (
      <div>
        <h3 className="h3">Registartion</h3>
        <form onSubmit={this.handleSubmit.bind(this)}>
                <div className="form-group">
                  <input className="form-control" name="email" type="mail" placeholder="Email" />
                </div>
                <div className="form-group">
                  <input className="form-control" name="pass" type="password" placeholder="Password" />
                </div>
                <div className="form-group">
                  <input className="form-control" name="pass_confirm" type="password" placeholder="Confirm Password" />
                </div>
                <button className="btn btn-default" type="submit">Registration</button>
        </form>
      </div>
    )
  }
}
export default Registration;