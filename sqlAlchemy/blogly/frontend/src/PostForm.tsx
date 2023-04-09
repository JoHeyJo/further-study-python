//dependencies
import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Button } from "react-bootstrap";
//modules
import { userGet, postAdd } from './api';
import { IUser, IPost } from "./interface";

/** Handles/ submits post data & renders form for new post 
 * 
 * State:
 * - user: {id:0,firstName:'',lastName:'', image:''}
 * - post = {title:'', content:''}
 * 
 * Post -> PostForm
*/
function PostForm({ }) {
  const [userData, setUserData] = useState<IUser>({ id: 0, firstName: '', lastName: '', image: '' })
  const [postData, setPostData] = useState<IPost>({ title: '', content: '', userId: 0 })

  const params = useParams();
  const userId = +params.id!




  /** fetches user data on mount*/
  useEffect(() => {
    async function fetchUser() {
      const res = await userGet(userId);
      setUserData(res);
    };
    setPostData(p => {
      p.userId = userId
      return p
    })
    fetchUser();
  }, [])

  /** handles changes in form */
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    console.log(e.target.name)
    const title = e.target.name;
    const content = e.target.value;
    // console.log(name,value)
    setPostData(p => ({
      ...p,
      [title]: content
    }))
  }

  /**Submit post data */
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    postAdd(postData);
  }

  return (
    <>
      <h1>Add Post for {userData.firstName} {userData.lastName}</h1>
      <form onSubmit={handleSubmit} className="PostForm-form">

        <label htmlFor="form-title">Title:</label>
        <input className="PostForm-title"
          onChange={handleChange}
          id="form-title"
          name="title" />

        <label htmlFor="form-content">Content:</label>
        <input className="PostForm-content"
          onChange={handleChange}
          id="form-content"
          name="content" />

        <Button type='submit' variant="info">Cancel</Button>
        <Button type='submit' variant="success">Submit</Button>
      </form>
    </>
  )
}

export default PostForm;