//dependencies
import React, { useEffect, useState } from 'react';
// import { redirect } from 'react-router-dom';
import { useNavigate, useLocation } from "react-router-dom";
//components
import { IUser } from './interface';
import { userAdd, userGet, userUpdate } from './api';
// style
import './style/Form.css';

const defaultUser = { id: 0, firstName: '', lastName: '', image: '' };

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
  const [userData, setUserData] = useState<undefined | number>(0)
  const location = useLocation();
  const { userId } = location.state


  /** Handles changes to form state */
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setUser(data => ({
      ...data,
      [name]: value,
    }))
  }

  /** Fetches existing through API*/
  async function fetchUser(id: number | undefined) {
    let res = await userGet(id)
    setUser(res);
    console.log(res)
  }

  /** send user data to api */
  async function submitUser() {
    try {
      if (user.id) {
        let res = await userUpdate(user.id, user)
        setUser(defaultUser)
      } else {
        let res = await userAdd(user)
        setUser(defaultUser);
      }
    } catch (error: any) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (user.id !== 0)
      try {
        fetchUser(userId);
      } catch (error: any) {
        console.error(error)
      }
  }, [])

  console.log('in here')

  return (
    <>
      <form className='Form-input' onSubmit={() => {
        submitUser()
        // redirect('/')
      }
      }>
        <label htmlFor='first-name-input'>First Name</label>
        <input onChange={handleChange}
          name="firstName"
          id="first-name-input"
          className='Form-first-name'
          placeholder='First Name:'
          value={user.firstName}>
        </input>
        <label htmlFor='last-name-input'>Last Name</label>
        <input onChange={handleChange}
          name="lastName"
          id="last-name-input"
          className='Form-last-name'
          placeholder='Last Name:'
          value={user.lastName}>
        </input>
        <label htmlFor='image-input'>Image URL</label>
        <input onChange={handleChange}
          name="image"
          className='Form-imgUrl'
          placeholder='Image URL:'>
        </input>
        <button>Add User</button>
      </form>
    </>
  )
}

export default Form;