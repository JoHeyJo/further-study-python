//dependencies
import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import { useParams, Link } from "react-router-dom";
//components / modules
import { IPostData } from './interface';
import { postGet } from './api';


/** Renders individual post
 * 
 * State:
 *  - post = {id=0, title='', content='', user_id,...}
 * 
 * User -> Posts -> Post
 */
function Post() {
  const [post, setPost] = useState<IPostData>(
    {
      id: 0,
      title: '',
      content: '',
      firstName: '',
      lastName: '',
      userId: 0,
      created_at: '',
      imageUrl: null
    })
  const params = useParams();

  const postId = +params.post_id!

  /**On mount fetches post */
  useEffect(() => {
    async function fetchPost() {
      const res = await postGet(postId)
      setPost(res)
    };
    fetchPost()
  }, [])

  return (
    <div>
      <h1 className="Post-title">{post.title}</h1>
      <h3 className="Post-content">{post.content}</h3>
      <h4 className="Post-author">By: {post.firstName} {post.lastName}</h4>
      <div className="Post-controls">
        <Link to={`/users/${post.userId}`}><Button variant="outline-primary">Cancel</Button></Link>
        <Link to={`/posts/${postId}/edit`}><Button variant="primary">Edit</Button></Link>
        <Link to={`/users/${post.userId}`}><Button variant="danger">Delete</Button></Link>
        
      </div>
    </div>
  )
}

export default Post;