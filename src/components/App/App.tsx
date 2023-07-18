import './App.scss';
import { Route, Routes } from 'react-router-dom';
import Home from './../Home/Home';
import Login from './../Login/Login';
import { useEffect, useState } from 'react';
import { RequireAuth } from 'react-auth-kit';

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <RequireAuth loginPath="/login">
            <Home />
          </RequireAuth>
        }
      ></Route>
      <Route path="/login" element={<Login />}></Route>
    </Routes>
  );
}

export default App;
