//dependencies
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// components
import UserForm from './UserForm';
import Users from './Users';
import User from './User'
import EditUser from './EditUser'
import PostForm from './PostForm'
// style
import './style/App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Users />}/>
          <Route path='/form' element={<UserForm/>}/>
          <Route path='/users' element={<Users/>}/>
          <Route path='/users/:id' element={<User/>}/>
          <Route path='/users/:id/edit' element={<UserForm/>}/>
          <Route path="/users/:id/posts/new" element={<PostForm/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
