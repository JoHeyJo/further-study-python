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
import DraftEditorConvertFromRaw from "./DraftEditorConvertFromRaw";
//styles
import './style/Post.css'


type PostProp = {
  postId: number;
  handlePostRender: () => void;
  fetchEditPost?: (postId: number) => void;
}
/** Renders individual post
 * 
 * State:
 *  - post = {id=0, title='', content='', user_id,...}
 * 
 * User -> Posts -> Post
 */
function Post({ post, handlePostRender, fetchEditPost }: any) {
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

  const problem = <DraftEditorConvertFromRaw rawContent={post.problem}/>
  const solution = <DraftEditorConvertFromRaw rawContent={post.solution}/>
  const content = <DraftEditorConvertFromRaw rawContent={post.content}/>

  return (
    <Container>
      <Stack gap={3}>
        <h2 className="Post-title bg-light border">{post.title}</h2>
        <Stack direction="horizontal" className="" >
          <h6 className="Post-subtitle">Context:</h6>
          <h5 className="Post-content ms-2">{content}</h5>
        </Stack>
        <Stack direction="horizontal" className="" id="problem-stack">
          <h6 className="Post-subtitle">Problem:</h6>
          <div className="Post-problem ms-2">{problem}</div>
        </Stack>
        <Stack direction="horizontal" className="">
          <h6 className="Post-subtitle">Solution:</h6>
          <div className="Post-solution container ms-2">{solution}</div>
        </Stack>
        <h6 className="Post-author">By: {post.firstName} {post.lastName}</h6>
      </Stack>
      <div className="Post-controls">
        <PopOut action={'edit'} postId={post.id} fetchEditPost={fetchEditPost} />
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