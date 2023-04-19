import { React, useState } from "react";
import { Button } from "antd";
import Axios from "axios";

export default function SignIn() {

const [inputValue, setInputValue] = useState({
  email: '',
  password: '',
});
const [inputValueCheck, setInputValueCheck] = useState({
  emailCheck: false,
  emailText: '', //안내문구
  passwordCheck: false
});

const { email, password } = inputValue;
const { emailCheck, emailText, passwordCheck } = inputValueCheck;

const valueCheck = (e) => {
  const { name, value } = e.target;
  setInputValue({
    ...inputValue,
    [name]: value,
  });
  switch (name) {
    case 'email':
    if (value.length > 2){
      if (value.includes('@')){
        setInputValueCheck({
          ...inputValueCheck,
          emailCheck: true,
          emailText: ''
        })
      } else {
        setInputValueCheck({
          ...inputValueCheck,
          emailCheck: false,
          emailText: '올바르지 않은 형식입니다.'
        })
      }
    } else {
      setInputValueCheck({
        ...inputValueCheck,
        emailCheck: false,
        emailText: ''
      })
    }
    break;

    case 'password':
      if (value.length > 2){
        if (value.length > 7){
          setInputValueCheck({
            ...inputValueCheck,
            passwordCheck: true
          })
        } else {
          setInputValueCheck({
            ...inputValueCheck,
            passwordCheck: false
          })
        }
      } else {
        setInputValueCheck({
          ...inputValueCheck,
          passwordCheck: false
        })
      }
    break;

    default:
      break;
  }
}

  function LogInSubmit() {
  Axios.post('https://www.pre-onboarding-selection-task.shop/auth/signin', {
      email: email,
      password: password
    })
    .then(function (response) {
      localStorage.setItem('key', response.data['access_token']);
    });
      }

  return (
    <div class="sign--box">
      <h1>로그인</h1>
    <input placeholder="Email" autoComplete="email" name="email" onChange={valueCheck} data-testid="email-input" />
    <br></br>{emailText}
    <input type="password" autoComplete="current-password" name="password" onChange={valueCheck} data-testid="password-input" />
    <br></br>
    <Button onClick={ LogInSubmit } data-testid="signin-button" disabled={!(emailCheck && passwordCheck)} >로그인</Button>
    </div>
  );


  
}