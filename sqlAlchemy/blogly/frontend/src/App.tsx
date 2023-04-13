//dependencies
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
// components
import UserForm from './UserForm';
import Users from './Users';
import User from './User';
import EditUser from './EditUser';
import PostForm from './PostForm';
import Post from './Post';
// style
import './style/App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Users />}/>
          <Route path='/form' element={<UserForm />}/>
          <Route path='/users' element={<Users />}/>
          <Route path='/users/:user_id' element={<User />}/>
          <Route path='/users/:user_id/edit' element={<UserForm />}/>
          <Route path="/users/:user_id/posts/new" element={<PostForm />}/>
          <Route path="/posts/:post_id" element={<Post />}/>
          <Route path="/posts/:post_id/edit" element={<PostForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
