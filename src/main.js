import React from 'react';
import {BrowserRouter, Router, Route, Link, Routes} from 'react-router-dom';

import Home from './pages/home';
import Intro from './pages/intro';
import Login from './pages/login';
import NoPage from './pages/nopage';
import Skola from './pages/skola';
import Vertejums from './pages/vertejums/index';

const Main = () => {
  return (
    <Routes> {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path='/' element={<Intro />}></Route>
      <Route exact path='/login' element={<Login />}></Route>
      <Route exact path='/home' element={<Home />}></Route>
      <Route exact path='/skola' element={<Skola />}></Route>
      <Route exact path='/vertejums' element={<Vertejums />}></Route>
      <Route exact path='*' element={<NoPage />}></Route>
    </Routes>
  );
}

export default Main;