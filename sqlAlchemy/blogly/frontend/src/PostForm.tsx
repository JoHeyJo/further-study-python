//dependencies
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from "react-bootstrap";
//modules
import { userGet, postAdd, postEdit, postUpdate } from './api';
import { IUser, IPost } from "./interface";

const defaultPost: IPost = { title: '', content: '', userId: 0, firstName:'', lastName:'', id:0, createdAt:'', problem:'', solution:'' }

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
  const [postData, setPostData] = useState<IPost>(defaultPost)

  const params = useParams();
  const userId = +params.user_id!
  const postId = +params.post_id!


  console.log('userId', userId)
  console.log('postId', postId)
  const navigate = useNavigate();

  /** fetches data on mount*/
  useEffect(() => {
    //in response to new post, fetch user data and update state w/ user data
    async function fetchData() {
      if (userId) {
        setPostData(p => {
          p.userId = userId
          return p
        })
        fetchUser(userId);
      }
      //in response to post edit, fetch post data and update state w/ post data
      if (postId) {
        const post: IPost = await fetchPost();
        fetchUser(post.userId);
      }
    };
    fetchData();
  }, [])

  /** Fetches user data*/
  async function fetchUser(userId: number) {
    const res = await userGet(userId);
    setUserData(res);
  };

  /** Fetches post data*/
  async function fetchPost(): Promise<IPost> {
    const res = await postEdit(postId);
    setPostData(res);
    return res
  }

  /** handles changes in form */
  function handleChange(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) {
    e.preventDefault();
    const title = e.target.name;
    const content = e.target.value;
    setPostData(p => ({
      ...p,
      [title]: content
    }))
  }

  /**Submit post data */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if(userId){
      try {
        await postAdd(postData);
        setPostData(defaultPost);
        navigate(`/users/${userId}`);
      } catch (error: any) {
        console.error(`Error adding post => ${error}`)
      }
    }
    if(postId){
      try{
        await postUpdate(postId, postData);
        setPostData(defaultPost);
        navigate(`/users/${postData.userId}`);
      } catch(error: any){
        console.error(`Error updating post => ${error}`)
      }
    }
  }

  return (
    <>
      <h1>{userId ? 'Add' : 'Edit'} Post for {userData.firstName} {userData.lastName}</h1>
      <form onSubmit={handleSubmit} className="PostForm-form">

        <label htmlFor="form-title">Title:</label>
        <input className="PostForm-title"
          onChange={handleChange}
          value={postData.title}
          id="form-title"
          name="title" />

        <label htmlFor="form-content">Content:</label>
        <textarea className="PostForm-content"
          onChange={handleChange}
          value={postData.content}
          id="form-content"
          name="content" />
        
        <label htmlFor="form-problem">Problem:</label>
        <textarea className="PostForm-problem"
          onChange={handleChange}
          value={postData.problem}
          id="form-problem"
          name="problem" />
        
        <label htmlFor="form-solution">Solution:</label>
        <textarea className="PostForm-solution"
          onChange={handleChange}
          value={postData.solution}
          id="form-solution"
          name="solution" />

        <Link to={`/users/${userId}`}><Button variant="outline-primary">Cancel</Button></Link>
        <Button type='submit' variant="success">Submit</Button>
      </form>
    </>
  )
}

export default PostForm;