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
import HomePage from './HomePages';
import ProjectForm from './ProjectForm';
import Project from './Project';
import Projects from './Projects';
import NotFound from './NotFound';
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
          <Route path='/users/:user_id/posts/new' element={<PostForm />}/>
          <Route path='/posts/:post_id' element={<Post />}/>
          <Route path='/posts/:post_id/edit' element={<PostForm />} />
          <Route path='/homepage' element={<HomePage />}/>
          <Route path='/users/:user_id/projects' element={<ProjectForm />}/>
          {/* <Route path='/projects/:project_id' element={<Projects />} /> */}
          <Route path="*" element={<NotFound />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
