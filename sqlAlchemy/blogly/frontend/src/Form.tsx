//dependencies
import React, { useState } from 'react';
// import { redirect } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
//components
import { IUser } from './interface';
import { userGetAll, userAdd } from './api';
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
  const navigate = useNavigate();
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

  /** Handles submission of form ??????????*/
  async function fetchUsers(){
    let res =  userGetAll()
    console.log('res',res)
    setUserData(res);
  }

  /** send user data to api */
  async function submitUser(){
    let res = await userAdd(user)
    setUser(defaultUser);
    console.log('no errors')
    try {
      navigate('/users')
      console.log('no errors')
    } catch (error:any) {
      console.log(error)
    }
  }

  return (
    <>
      <form className='Form-input' onSubmit={()=>{
        submitUser()
        // redirect('/')
      }
      }>
      <label htmlFor='first-name-input'>First Name</label>
      <input onChange={handleChange} name="firstName"id="first-name-input" className='Form-first-name' placeholder='First Name:'></input>
      <label htmlFor='last-name-input'>Last Name</label>
      <input onChange={handleChange} name="lastName"id="last-name-input" className='Form-last-name' placeholder='Last Name:'></input>
      <label htmlFor='image-input'>Image URL</label>
      <input onChange={handleChange} name="image" className='Form-imgUrl' placeholder='Image URL:'></input>
      <button>Add User</button>
    </form>
      <button onClick={fetchUsers}>Get all users</button>
    </>
  )
}

export default Form;