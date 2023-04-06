//dependencies
import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import { useParams } from "react-router";
//components / modules
import { IPost } from './interface';
import { getPost } from './api';


/** Renders individual post
 * 
 * State:
 *  - post = {id=0, title='', content='', user_id}
 * 
 * Posts -> Post
 */
function Post() {
  const [post, setPost] = useState<IPost>({ id: 0, title: '', content: '', firstName:'', lastName:'' })
  const params = useParams();

  const id = +params.id!

  useEffect(() => {
    async function fetchPost() {
      const res = await getPost(id)
      setPost(res)
      console.log(res)
    };
    fetchPost()
  },[])

  return (
    <div>
      <h1 className="Post-title">{post.title}</h1>
      <h3 className="Post-content">{post.content}</h3>
      <h4 className="Post-author">By: {post.firstName} {post.lastName}</h4>
      <div className="Post-controls">
        <Button variant="outline-primary">Cancel</Button>
        <Button variant="primary">Edit</Button>
        <Button variant="danger">Delete</Button>
      </div>
    </div>
  )
}

export default Post;