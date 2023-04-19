import { Axios as axios } from "axios";

export default function SignUpSubmit(inputValue) {
  axios({
  method: 'post',
  url: 'https://www.pre-onboarding-selection-task.shop/auth/signup',
  data: {inputValue
  }
  }).then(function (response) {
    console.log(response.status);
    console.log(response.statusText);
  });
    }

export function LogInSubmit(inputValue) {
      axios({
      method: 'post',
      url: 'https://www.pre-onboarding-selection-task.shop/auth/signin',
      data: {inputValue
      }
      }).then(function (response) {
        console.log(response.data);
        console.log(response.status);
        console.log(response.statusText);
      });
        }