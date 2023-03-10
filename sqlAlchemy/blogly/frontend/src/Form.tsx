//dependencies
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
// import { redirect } from 'react-router-dom';
import { useNavigate, useLocation, Link } from "react-router-dom";
//components
import { IUser } from './interface';
import { userAdd, userUpdate, userEdit } from './api';
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
  const [user, setUser] = useState<IUser>(defaultUser);
  const [userData, setUserData] = useState<{}>({})
  const navigate = useNavigate();

  const location = useLocation();
  const userId = location.state?.userId;

  /** Handles changes to form state */
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setUser(data => ({
      ...data,
      [name]: value,
    }))
  }

  /** Fetches existing user to edit though API*/
  async function fetchUser(id: number | undefined) {
    try{
      let res = await userEdit(id)
      setUser(res);
    } catch (error: any){
      console.error(`Error: fetchUser => ${error}`)
    }
  }

  /** send user data to api */
  async function submitUser(e: any) {
    e.preventDefault();
    try {
      if (userId) {
        // update user
        let res = await userUpdate(user.id, user)
        setUser(defaultUser)
        navigate('/')
      } else {
        // add user
        let res = await userAdd(user)
        setUser(defaultUser);
        navigate('/')
      }
    } catch (error: any) {
      console.error(error)
    }
  }

  /** calls fetchUser on mount, if a user id is passed on render */
  useEffect(() => {
    try {
      if (userId) {
        fetchUser(userId);
      }
    } catch (error: any) {
      console.error(error)
    }
  }, [])

  return (
    <>
      <form className='Form-input' onSubmit={submitUser}>
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

        <button>{!user.id ? 'Add User' : 'Update User'}</button>

        {/* <Link to={`/users/${user.id}/`}> */}
        <button onClick={() =>navigate(`/users/${user.id}/`)}>Cancel</button>
        {/* </Link> */}
      </form>
    </>
  )
}

export default Form;