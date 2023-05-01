//dependencies
import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import { useParams, Link, useNavigate } from "react-router-dom";
import Stack from 'react-bootstrap/Stack';
//components / modules
import { IPostData } from './interface';
import { postGet, postDelete } from './api';
//styles
import './style/Post.css'
import { Container } from "react-bootstrap";

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
      createdAt: '',
      imageUrl: null,
      problem: '',
      solution: ''
    })
  const params = useParams();

  const postId = +params.post_id!

  const navigate = useNavigate();

  /**On mount fetches post */
  useEffect(() => {
    async function fetchPost() {
      const res = await postGet(postId)
      setPost(res)
    };
    fetchPost()
  }, [])

  /** Deletes user post */
  async function deletePost() {
    try {
      const res = await postDelete(postId)
      navigate(`/users/${post.userId}`)
    } catch (error: any) {
      console.error(`Error in deletePost => ${error}`)
    }
  }

  return (
    <>
      <Container>
        <Stack gap={3}>
          <h1 className="Post-title bg-light border">{post.title}</h1>
          <Stack direction="horizontal" className="justify-content-center" >
            <h6 className="Post-subtitle">Context:</h6>
            <h3 className="Post-content ms-2">{post.content}</h3>
          </Stack>
          <Stack direction="horizontal" className="justify-content-center">
            <h6 className="Post-subtitle">Problem:</h6>
            <p className="Post-problem ms-2">{post.problem}</p>
          </Stack>
          <Stack direction="horizontal" className="justify-content-center">
            <h6 className="Post-subtitle">Solution:</h6>
            <p className="Post-solution ms-2">{post.solution}</p>
          </Stack>
          <h6 className="Post-author">By: {post.firstName} {post.lastName}</h6>
        </Stack>
        <div className="Post-controls">
          <Link to={`/users/${post.userId}`}><Button variant="outline-primary">Cancel</Button></Link>
          <Link to={`/posts/${postId}/edit`}><Button variant="primary">Edit</Button></Link>
          <Button onClick={deletePost} variant="danger">Delete</Button>

        </div>

      </Container>
    </>
  )
}

export default Post;