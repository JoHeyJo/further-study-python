import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
import SignupForm from './auth/SignupForm';
import { IUser } from "./interface";
import LoginForm from "./auth/LoginForm";

type RoutesListProps = {
  signup: (formData: IUser) => void;
  login: (formData: IUser) => void;
  logout: () => void;
}
/** Site-wide routes. 
 * 
 * Most of site is available if logged out however certain actions are limited
 * 
 * non-existent route is caught by NotFound component
 * 
 */

function RoutesList({signup, login, logout}: RoutesListProps){
  return (
    <>
      <Routes>
        <Route path='/' element={<Users />} />
        <Route path='/signup' element={<SignupForm signup={signup}/>} />
        <Route path="/login" element={<LoginForm login={login}/>} />
        <Route path='/form' element={<UserForm />} />
        <Route path='/users' element={<Users />} />
        <Route path='/users/:user_id' element={<User />} />
        <Route path='/users/:user_id/edit' element={<UserForm />} />
        <Route path='/homepage' element={<HomePage />} />
        <Route path='/users/:user_id/projects/new' element={<ProjectForm />} />
        <Route path='/users/:user_id/projects/:project_id' element={<Project />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default RoutesList;