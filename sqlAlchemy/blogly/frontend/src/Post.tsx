//dependencies
import React, { useState, useEffect, useContext } from "react";
import Button from 'react-bootstrap/Button';
import { useParams, Link, useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import Stack from 'react-bootstrap/Stack';
//components / modules
import { postDelete } from './api';
import { ProjectContext } from "./userContext";
import PopOut from "./PopOut";
//styles
import './style/Post.css'


type PostProp = {
  postId: number;
  handlePostRender: () => void;
}
/** Renders individual post
 * 
 * State:
 *  - post = {id=0, title='', content='', user_id,...}
 * 
 * User -> Posts -> Post
 */
function Post({ post, handlePostRender }: any) {
  const navigate = useNavigate();
  const { fetchProjectPosts, projectId } = useContext(ProjectContext);

  /** Deletes user post */
  async function deletePost() {
    try {
      const res = await postDelete(post.id)
      fetchProjectPosts();
    } catch (error: any) {
      console.error(`Error in deletePost => ${error}`)
    }
  }

  return (
    <Container>
      <Stack gap={3}>
        <h1 className="Post-title bg-light border">{post.title}</h1>
        <Stack direction="horizontal" className="justify-content-center" >
          <h6 className="Post-subtitle">Context:</h6>
          <h3 className="Post-content ms-2">{post.content}</h3>
        </Stack>
        <Stack direction="horizontal" className="justify-content-center" id="problem-stack">
          <h6 className="Post-subtitle">Problem:</h6>
          <p className="Post-problem ms-2">{post.problem}</p>
        </Stack>
        <Stack direction="horizontal" className="justify-content-center">
          <h6 className="Post-subtitle">Solution:</h6>
          <p className="Post-solution container ms-2">{post.solution}</p>
        </Stack>
        <h6 className="Post-author">By: {post.firstName} {post.lastName}</h6>
      </Stack>
      <div className="Post-controls">
        <PopOut postId={post.id} />
        <Button onClick={() => {
          deletePost();
          handlePostRender(false)
        }
        } variant="danger">Delete</Button>
      </div>

    </Container>
  )
}

export default Post;