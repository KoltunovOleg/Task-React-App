import React, { Component } from 'react';

//It is compare pass & pass_confirm
function toCompare(...args) {
  console.log(`toCompare: ${args}`);

  let retrievedObject = localStorage.getItem(args[0]);
    if (retrievedObject) {
      return false;
    } else {
      return true;
    } 
}

//It is save email & pass to localstorage
function saveDataUser(email, pass) {
  let arrDataUser = { pass: pass };
  console.log(arrDataUser);
  localStorage.setItem(email, JSON.stringify(arrDataUser));
}



/**
 * Function EmailValidator
 */
function emailValidator(input) {
  let state = 0,
    ch,
    index = 0,
    mark = 0,
    local = null,
    domain = [];

  while (index <= input.length && state != -1) {

    if (index == input.length) {
      ch = '\0'; // Так мы обозначаем конец нашей работы
    }
    else {
      ch = input[index];
      if (ch == '\0') {
        // символ, которым мы кодируем конец работы, не может быть частью ввода
        return false;
      }
    }

    switch (state) {

      case 0: {
        // Первый символ {atext} -- текстовой части локального имени
        if ((ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z')
          || (ch >= '0' && ch <= '9') || ch == '_' || ch == '-'
          || ch == '+') {
          state = 1;
          break;
        }
        // Если встретили неправильный символ -> отмечаемся в state об ошибке
        state = -1;
        break;
      }

      case 1: {
        // Остальные символы {atext} -- текстовой части локального имени
        if ((ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z')
          || (ch >= '0' && ch <= '9') || ch == '_' || ch == '-'
          || ch == '+') {
          break;
        }
        if (ch == '.') {
          state = 2;
          break;
        }
        if (ch == '@') { // Конец локальной части
          local = new String(input, 0, index - mark);
          mark = index + 1;
          state = 3;
          break;
        }
        // Если встретили неправильный символ -> отмечаемся в state об ошибке
        state = -1;
        break;
      }

      case 2: {
        // Переход к {atext} (текстовой части) после точки
        if ((ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z')
          || (ch >= '0' && ch <= '9') || ch == '_' || ch == '-'
          || ch == '+') {
          state = 1;
          break;
        }
        // Если встретили неправильный символ -> отмечаемся в state об ошибке
        state = -1;
        break;
      }

      case 3: {
        // Переходим {alnum} (домену), проверяем первый символ
        if ((ch >= 'a' && ch <= 'z') || (ch >= '0' && ch <= '9')
          || (ch >= 'A' && ch <= 'Z')) {
          state = 4;
          break;
        }
        // Если встретили неправильный символ -> отмечаемся в state об ошибке
        state = -1;
        break;
      }

      case 4: {
        // Собираем {alnum} --- домен
        if ((ch >= 'a' && ch <= 'z') || (ch >= '0' && ch <= '9')
          || (ch >= 'A' && ch <= 'Z')) {
          break;
        }
        if (ch == '-') {
          state = 5;
          break;
        }
        if (ch == '.') {
          domain.push(input.slice(mark, index - mark));
          mark = index + 1;
          state = 5;
          break;
        }
        // Проверка на конец строки
        if (ch == '\0') {
          domain.push(input.slice(mark, index - mark));
          state = 6;
          break; // Дошли до конца строки -> заканчиваем работу
        }
        // Если встретили неправильный символ -> отмечаемся в state об ошибке
        state = -1;
        break;
      }

      case 5: {
        if ((ch >= 'a' && ch <= 'z') || (ch >= '0' && ch <= '9')
          || (ch >= 'A' && ch <= 'Z')) {
          state = 4;
          break;
        }
        if (ch == '-') {
          break;
        }
        // Если встретили неправильный символ -> отмечаемся в state об ошибке
        state = -1;
        break;
      }

      case 6: {
        // Успех! (На самом деле, мы сюда никогда не попадём)
        break;
      }
    }
    index++;
  }

  // Остальные проверки

  // Не прошли проверку выше? Возвращаем false!
  if (state != 6)
    return false;

  // Нам нужен домен как минимум второго уровня
  if (domain.length < 2)
    return false;

  // Ограничения длины по спецификации RFC 5321
  if (local.length > 64)
    return false;

  // Ограничения длины по спецификации RFC 5321
  if (input.length > 254)
    return false;

  // Домен верхнего уровня должен состоять только из букв и быть не короче двух символов
  index = input.length - 1;
  while (index > 0) {
    ch = input[index];
    if (ch == '.' && input.length - index > 2) {
      return true;
    }
    if (!((ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z'))) {
      return false;
    }
    index--;
  }

  return true;
}


/**
 * Function PassValidator
 */
function passValidator(input) {
  if(input.length>3){
    return true;
  }else{
    return false;
  }
}
/**
 * Function PassConfirmValidator
 */
function passConfirmValidator(...args) {
  if(args[0].length > 3 && args[0] === args[1]){
    return true;
  }else{
    return false;
  }
}


class Registration extends Component {

  constructor() {
    super(...arguments);
    this.state = {
      validEmail: "",
      validPass: "",
      validPassConfirm: "",
      accessEmail: false,
      accessPass: false,
      accessPassConfirm: false,
      glyphiconEmail: "",
      glyphiconPass: "",
      glyphiconPassConfirm: ""
    };
  }

  handleSubmit(event) {
    let email = event.target.email.value,
        pass = event.target.pass.value;
      if( this.state.accessEmail && this.state.accessPass && this.state.accessPassConfirm){
        saveDataUser(email, pass);
        this.props.onchangeAccess(true);
      } else{
        this.props.onchangeAccess(false);
      }
    
    event.preventDefault();
  }

  onBlurEmail(event) {
    let value = event.target.value;
    let placeholder = event.target.placeholder;
    console.log(`onBlur ${value}`);

    if (!value && placeholder) {
      this.setState({
        validEmail: "",
        accessEmail: false,
        glyphiconEmail: ""
      });
    } else if (emailValidator(value)) {
      if(toCompare(value)){
      this.setState({
        validEmail: "has-success",
        accessEmail: true,
        glyphiconEmail: "glyphicon-ok"
      });} else{
        this.setState({
        validEmail: "has-error",
        accessEmail: false,
        glyphiconEmail: "glyphicon-remove"
      });
      alert ('Such email already exist');
      }
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
    let placeholder = event.target.placeholder;
    console.log(`onBlur ${value}`);
    if (!value && placeholder) {
      this.setState({
        validPass: "",
        accessPass: false,
        glyphiconPass: ""
      });
    }else if (passValidator(value)) {
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
  onBlurPassConfirm(event) {
    let value = event.target.value;
    let placeholder = event.target.placeholder;
    let pass = this.refs.passField.value;
    console.log(`onBlur ${value}`);
    if (!value && placeholder) {
      this.setState({
        validPassConfirm: "",
        accessPassConfirm: false,
        glyphiconPassConfirm: ""
      });
    }else if (passConfirmValidator(value, pass)) {
      this.setState({
        validPassConfirm: "has-success",
        accessPassConfirm: true,
        glyphiconPassConfirm: "glyphicon-ok"
      });
    } else {
      this.setState({
        validPassConfirm: "has-error",
        accessPassConfirm: false,
        glyphiconPassConfirm: "glyphicon-remove"
      });
    }
  }

  render() {
    return (
      <div>
        <h3 className="h3">Registartion</h3>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className={`form-group ${this.state.validEmail} has-feedback`}>
            <input className="form-control" name="email" type="mail" placeholder="Email" 
            onBlur={this.onBlurEmail.bind(this)} />
            <span className={`glyphicon ${this.state.glyphiconEmail} form-control-feedback`} aria-hidden="true"></span>
          </div>
          <div className={`form-group ${this.state.validPass} has-feedback`}>
            <input className="form-control" name="pass" type="password" placeholder="Password" 
            ref = "passField"
            onBlur={this.onBlurPass.bind(this)}/>
            <span className={`glyphicon ${this.state.glyphiconPass} form-control-feedback`} aria-hidden="true"></span>
          </div>
          <div className={`form-group ${this.state.validPassConfirm} has-feedback`}>
            <input className="form-control" name="pass_confirm" type="password" placeholder="Confirm Password" 
            onBlur={this.onBlurPassConfirm.bind(this)} />
            <span className={`glyphicon ${this.state.glyphiconPassConfirm} form-control-feedback`} aria-hidden="true"></span>
          </div>
          <button className="btn btn-default" type="submit">Registration</button>
        </form>
      </div>
    )
  }
}
export default Registration;