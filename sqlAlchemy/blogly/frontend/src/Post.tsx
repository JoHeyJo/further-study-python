//dependencies
import React, { useState, useEffect, useContext } from "react";
import Button from 'react-bootstrap/Button';
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import Stack from 'react-bootstrap/Stack';
//components / modules
import { postDelete, postGet } from './api';
import { ProjectContext } from "./userContext";
import PopOut from "./PopOut";
import DraftEditorConvertFromRaw from "./DraftEditorConvertFromRaw";
import ViewPopOut from "./ViewPopOut";
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
function Post({ initialPost, handlePostRender, fetchEditPost }: any) {
  const [post, setPost] = useState(initialPost)
  const { fetchProjectPosts, projectId } = useContext(ProjectContext);
  const postId = +useParams().post_id!;

  if (!post) {
    fetchPost();
  }

  /** retrieves post corresponding to id */
  async function fetchPost() {
    try {
      const res = await postGet(postId);
      setPost(res);
      console.log('res in  fetchPost', res)
      return res;
    } catch (error: any) {
      console.error(`Error in fetchPost => ${error}`)
    }
  }

  /** Deletes user post */
  async function deletePost() {
    try {
      const res = await postDelete(post.id)
      fetchProjectPosts();
    } catch (error: any) {
      console.error(`Error in deletePost => ${error}`)
    }
  }

  // debugger
  const problem = post ? <DraftEditorConvertFromRaw rawContent={post.problem} /> : null;
  const solution = post ? <DraftEditorConvertFromRaw rawContent={post.solution} /> : null;
  const content = post ? <DraftEditorConvertFromRaw rawContent={post.content} /> : null;

  // const convertedPost = { 'title': post.title, 'problem': problem, 'solution': solution, 'content': content }

  return (
    <Container>
      <Stack gap={3}>
        {/* <h2 className="Post-title bg-light border">{post.title}</h2> */}
        <span className="d-flex justify-content-end">
          {/* <PopOut action={'edit'} postId={post.id} fetchEditPost={fetchEditPost} /> */}
          {/* <ViewPopOut post={convertedPost} /> */}
        </span>
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
        {/* <h6 className="Post-author">By: {post.firstName} {post.lastName}</h6> */}
      </Stack>
      <div className="Post-controls">

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