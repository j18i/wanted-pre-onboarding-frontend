import { React, useState } from "react";
import { Button } from "antd";
import Axios from "axios";

export default function SignUp() {

const [inputValue, setInputValue] = useState({
  email: '',
  password: '',
});
const [inputValueCheck, setInputValueCheck] = useState({
  emailCheck: false,
  emailText: '', //이메일 안내문구
  passwordCheck: false,
  passwordText: '', //비밀번호 안내문구
});

const { email, password } = inputValue;
const { emailCheck, emailText, passwordCheck, passwordText } = inputValueCheck;

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
          emailText: '이메일 형식으로 입력해주세요.'
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
            passwordCheck: true,
            passwordText: ''
          })
        } else {
          setInputValueCheck({
            ...inputValueCheck,
            passwordCheck: false,
            passwordText: '비밀번호는 8자 이상 입력해주세요.'
          })
        }
      } else {
        setInputValueCheck({
          ...inputValueCheck,
          passwordCheck: false,
          passwordText: ''
        })
      }
    break;

    default:
      break;
  }
}
  function SignUpSubmit() {
  Axios.post("https://www.pre-onboarding-selection-task.shop/auth/signup", {
    email: email,
    password: password
  })
  .then(function (response) {
    console.log(response.status);
    console.log(response.statusText);
  })
    }
  return (
    <div class="sign--box">
      <h1>회원 가입</h1>
    <input placeholder="Email" autoComplete="email" name="email" onChange={valueCheck} data-testid="email-input" />
    <br></br>{emailText}
    <input type="password" autoComplete="current-password" name="password" onChange={valueCheck} data-testid="password-input" />
    <br></br>{passwordText}
    <Button onClick={ SignUpSubmit } data-testid="signup-button" disabled={!(emailCheck && passwordCheck)} >회원가입</Button>
    </div>
  );


}