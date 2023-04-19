import { React, useState, useEffect, useCallback } from "react";
import { Button } from "antd";
import Axios from "axios";

let token = localStorage.getItem('key');
 
export default function ToDo() {

const [todoValue, settodoValue] = useState([
  {
    id: 1,
    todo: '이것은 할 일 예시입니다.',
    isCompleted: false,
    userId: 1,
  }
]);
  var checked = 0;
  useEffect(()=> {
    Axios.get('https://www.pre-onboarding-selection-task.shop/todos', {
      params: {
        id: 1,
        todo: "todos",
        isCompleted: false,
        userId: 1
      },
      headers: {
        Authorization: 'Bearer ' + token
      }
    }).then(function (response) {
      if (response.data.length === 0){
        if (checked === 0){
        Axios.post('https://www.pre-onboarding-selection-task.shop/todos/', 
        {
        todo: '이것은 할 일 예시입니다.',
        },{
       headers: {
        Authorization: 'Bearer ' + token,
        "Content-Type": "application/json"
      }
      });
      checked++;
      }
      }
      if (response.data.length > 0){
        settodoValue(response.data);
      }
    });
  }, []);
  
const [ newTodo, setnewTodo ] = useState('');
const newChange = useCallback(e=> {
  setnewTodo(e.target.value);
})

function getidlist() {
  var idlist = [];
  todoValue.map((x) => {
    idlist.push(x.id);
  })
  return idlist;
}



function addlist() {
  const newEl = {
    id: Math.max(...getidlist()) + 1,
    todo: newTodo,
    isCompleted: false,
    userId: 1
  }
  settodoValue(todoValue.concat(newEl));
  updatelist(newEl.id, 'new');
  setnewTodo('');
}

function findId(targetid) {
  return todoValue.findIndex(x => x.id === targetid);
  } 

function updatelist(todoid, type) {
  //새로 만들때
  if (type === 'new'){
    Axios.post('https://www.pre-onboarding-selection-task.shop/todos/', 
    {
      todo: newTodo,
    },{
    headers: {
      Authorization: 'Bearer ' + token,
      "Content-Type": "application/json"
    }
  });

  }
  //업데이트
  else if (type === 'update-com'){
  var todoindex = findId(todoid);
  Axios.put('https://www.pre-onboarding-selection-task.shop/todos/' + todoid, 
      {
        todo: todoValue[todoindex].todo,
        isCompleted: todoValue[todoindex].isCompleted
      },{
      headers: {
        Authorization: 'Bearer ' + token,
        "Content-Type": "application/json"
      }
    });
  }  else if (type === 'update-todo'){
    var todoindex = findId(todoid);
    let moditxt = document.getElementById('moditodo').value;
    Axios.put('https://www.pre-onboarding-selection-task.shop/todos/' + todoid, 
      {
        todo: moditxt,
        isCompleted: todoValue[todoindex].isCompleted
      },{
      headers: {
        Authorization: 'Bearer ' + token,
        "Content-Type": "application/json"
      }
    });
  }
  //삭제
  else if (type === 'delete'){
    Axios.delete('https://www.pre-onboarding-selection-task.shop/todos/' + todoid, {
      headers: {
        Authorization: 'Bearer ' + token,
      }
    });

  }
  
}


const [ modiToggle, setmodiToggle ] = useState([]);


if (modiToggle === '' && todoValue.length > 0){
let temp = [];
todoValue.map(() => {
  temp.push(false);
  return temp;
})
setmodiToggle(temp);
}

function modify(index) {
    let copyArray = [...modiToggle];
    if (modiToggle[index]){
      copyArray[index] = false;
      setmodiToggle(copyArray);
    } else if(!modiToggle[index]) {
      for (let i = 0; i < copyArray.length; i++) {
        copyArray[i] = false;
      }
      copyArray[index] = true;
      setmodiToggle(copyArray);
    }
  }

  return (
    <div className="todo-list-div">
      <input value={newTodo} onChange={newChange} data-testid="new-todo-input" />
      <button data-testid="new-todo-add-button" onClick={addlist}>추가</button>
      <br />
      
      { 
      todoValue.map((todos) => {
        let { id, todo, isCompleted, userId } = todos;
        let index = findId(id);

        function removetodo(deleteid) {
          settodoValue(todoValue.filter(x => x.id !== deleteid));
          updatelist(deleteid, 'delete');
        }

        function donetodo(todoid, checked) {
          if (checked){
            todos.isCompleted = false;
          } else {
            todos.isCompleted = true;
          }
          let copyArray = [...todoValue];
          copyArray[findId(todoid)] = {...copyArray[findId(todoid)], isCompleted: todos.isCompleted};
          settodoValue(copyArray);
          updatelist(todoid, 'update-com');
        }

        function modisubmit(todoid) {
          let moditxt = document.getElementById('moditodo').value;

          let copyArray = [...todoValue];
          copyArray[findId(todoid)] = {...copyArray[findId(todoid)], todo: moditxt};
          settodoValue(copyArray);
          updatelist(todoid, 'update-todo');
          modify(findId(todoid))
        }

        
        function ToggleTodo() {
        if (modiToggle[index]) {
          return (
          <li key={id} >
          <label>
          <input id="moditodo" data-testid="modify-input" />
          </label>
          <Button id="submit-btn" data-testid="submit-button" onClick={(e)=>{modisubmit(todos.id)}} >제출</Button>
          <Button id="cansel-btn" data-testid="cancel-button" onClick={(e) => {modify(findId(id))}}>취소</Button>
          </li>)
        } else {
          return (
          <li key={id} >
          <label>
          <input type="checkbox" defaultChecked={isCompleted} onChange={(e) => {donetodo(todos.id, todos.isCompleted)}}/>
          <span > {todo} </span>
        </label>
        <Button id="modi-btn" data-testid="modify-button" onClick={(e) => {modify(findId(id))}}>수정</Button>
        <Button id="del-btn" data-testid="delete-button" onClick={(e)=> {removetodo(todos.id)}}>삭제</Button>
        </li>)
        }
        }
        return (
          <ToggleTodo />
        );
    
      })}
      
    </div>
  )
  

}