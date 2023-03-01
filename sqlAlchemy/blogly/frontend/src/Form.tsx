import React, { useState } from 'react';
import './Form.css';
import { IUser } from './interface';
import { getUser } from './api';

const defaultUser = { firstName: '', lastName: '', image: '' };

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
  async function getUsers(){
    let res = await getUser()
    console.log('res',res)
    setUserData(res);
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
    </form>
      <button onClick={getUsers}>Get all users</button>
    </>
  )
}

export default Form;