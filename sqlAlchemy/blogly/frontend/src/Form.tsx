//dependencies
import React, { useState } from 'react';
//components
import { IUser } from './interface';
import { getUsers, addUser } from './api';
// style
import './style/Form.css';

const defaultUser = { id:0, firstName: '', lastName: '', image: '' };

/** Handles user information
 * 
 * Props:
 * 
 * State:
 * - user {firstName:string, lastName:string, imgUrl:string}
 * 
 * App -> Form
 */
function Form() {
  const [user, setUser] = useState<IUser>(defaultUser);
  const [userDate, setUserData] = useState({})

  /** Handles changes to form state */
  function handleChange(e: React.ChangeEvent<HTMLInputElement>){
    const { name, value } = e.target;
    setUser(data => ({
      ...data,
      [name]: value,
    }))
  }

  /** Handles submission of form */
  async function fetchUsers(){
    let res =  getUsers()
    console.log('res',res)
    setUserData(res);
  }

  /** send user data to api */
  async function pushUser(){
    let res = await addUser(user)
    console.log(res);
    setUser(defaultUser);
  }

  return (
    <>
    <form className='Form-input'>
      <label htmlFor='first-name-input'>First Name</label>
      <input onChange={handleChange} name="firstName"id="first-name-input" className='Form-first-name' placeholder='First Name:'></input>
      <label htmlFor='last-name-input'>Last Name</label>
      <input onChange={handleChange} name="lastName"id="last-name-input" className='Form-last-name' placeholder='Last Name:'></input>
      <label htmlFor='image-input'>Image URL</label>
      <input onChange={handleChange} name="image" className='Form-imgUrl' placeholder='Image URL:'></input>
      <button onClick={pushUser}>Add User</button>
    </form>
      <button onClick={fetchUsers}>Get all users</button>
    </>
  )
}

export default Form;