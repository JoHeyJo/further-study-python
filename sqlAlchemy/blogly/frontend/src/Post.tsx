//dependencies
import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import { useParams, Link } from "react-router-dom";
//components / modules
import { IPost } from './interface';
import { postGet } from './api';


/** Renders individual post
 * 
 * State:
 *  - post = {id=0, title='', content='', user_id,...}
 * 
 * User -> Posts -> Post
 */
function Post() {
  const [post, setPost] = useState<IPost>(
    {
      id: 0,
      title: '',
      content: '',
      firstName: '',
      lastName: '',
      user_id: 0,
      created_at: '',
      imageUrl: null
    })
  const params = useParams();

  const postId = +params.id!

  /**On mount fetches post */
  useEffect(() => {
    async function fetchPost() {
      const res = await postGet(postId)
      setPost(res)
      console.log(res)
    };
    fetchPost()
  }, [])

  return (
    <div>
      <h1 className="Post-title">{post.title}</h1>
      <h3 className="Post-content">{post.content}</h3>
      <h4 className="Post-author">By: {post.firstName} {post.lastName}</h4>
      <div className="Post-controls">
        <Link to={`/users/${post.user_id}`}><Button variant="outline-primary">Cancel</Button></Link>
        <Button variant="primary">Edit</Button>
        <Button variant="danger">Delete</Button>
      </div>
    </div>
  )
}

export default Post;