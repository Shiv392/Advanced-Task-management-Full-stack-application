import './App.css';
import {BrowserRouter as Router, Route, Switch, BrowserRouter, Routes } from 'react-router-dom';
import { Suspense,lazy } from 'react';
import CircularProgress  from '@mui/material/CircularProgress';
import AuthProvider from './Auth/Auth.js';
import AuthRoute from './Auth/AuthRoute.js';
import BackdropComp from './Common/Backdrop.js';

const Login=lazy(()=> import('./Login/Login'));
const SignUp=lazy(()=> import('./SignUp/SignUp.js'));
const Task=lazy(()=> import('./Tasklist/Tasklist.js'));

function App() {
  return (
    <AuthProvider>
    <BrowserRouter basename='/index.html'>
      <Suspense fallback={<BackdropComp openbackdrop={true} />}>
      <Routes>
        <Route path='/' Component={Login} />
        <Route path='/signup'element={<AuthRoute Component={SignUp}/>} />
        <Route path='/task' element={<AuthRoute Component={Task}/>}  />
      </Routes>
      </Suspense>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
