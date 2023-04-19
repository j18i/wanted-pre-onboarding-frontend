import React from 'react';
import { Route, Routes, Navigate } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import SignIn from './pages/signin';
import SignUp from './pages/signup';
import ToDo from './pages/todo';
import './App.css';
import { Button } from 'antd';

let token = localStorage.getItem('key');

function Main() {
    if (token && token !== ''){
        return(
        <div class="sign--box">
            <h1>To do</h1>
        <Button href='/todo'>to do list</Button>
        <br /><br /><br />
        현재 로그인 상태입니다.
        </div>
    )
    } else {
    return (
        <div class="sign--box">
            <h1>To do</h1>
        <Button href='/signup'>회원가입</Button>
        <Button href='/signin'>로그인</Button>
        </div>
    );
    }
}

const App = () => {
    if (token && token !== ''){
        return (
            <BrowserRouter>
            <Routes>
                <Route path="/signin" element={
                <Navigate to="/todo"></Navigate>} />
                <Route path="/signup" element={<Navigate to="/todo"></Navigate>} />
                <Route path="/todo" element={<ToDo />} />
                <Route path="/" element={<Main />} />
            </Routes>
            </BrowserRouter>
        );
    } else {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/todo" element={<Navigate to="/signin"></Navigate>} />
            <Route path="/" element={<Main />} />
        </Routes>
        </BrowserRouter>
    );
    }
};

export default App;