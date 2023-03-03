import React from 'react';
import './App.css';
import Form from './Form';
import Users from './Users';
import User from './User'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Users />}/>
          <Route path='/form' element={<Form/>}/>
          <Route path='/users' element={<Users/>}/>
          <Route path='/user/:id' element={<User/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
