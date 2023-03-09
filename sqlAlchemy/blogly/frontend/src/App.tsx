//dependencies
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// components
import Form from './Form';
import Users from './Users';
import User from './User'
import EditUser from './EditUser'
// style
import './style/App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Users />}/>
          <Route path='/form' element={<Form/>}/>
          <Route path='/users' element={<Users/>}/>
          <Route path='/user/:id' element={<User/>}/>
          <Route path='/user/:id/edit' element={<EditUser/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
