//dependencies
import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Button } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
//modules/components
import { userGet, postAdd, postEdit, postUpdate, projectPostAdd } from './api';
import { IUser, IPost, IAlert } from "./interface";
import AlertPopUp from './AlertPopUp';
import { ProjectContext, PostContext } from "./userContext";
import DraftEditor from "./DraftEditor";
//styles
import './style/PostForm.css';

type PostFormProp = {
  handleClose: () => void | undefined;
  postId: number | undefined;
  fetchEditPost?: (postId: number) => void;
}
const defaultPost: IPost = { title: '', content: '', userId: 0, firstName: '', lastName: '', id: 0, createdAt: '', problem: '', solution: '', projectId: 0 }
const defaultAlert: IAlert = { error: null };
/** Handles/ submits post data & renders form for new post 
 * 
 * State:
 * - user: {id:0,firstName:'',lastName:'', image:''}
 * - post = {title:'', content:''}
 * 
 * Modal -> PostForm
*/
function PostForm({ handleClose, postId, fetchEditPost }: PostFormProp) {
  const [userData, setUserData] = useState<IUser>({ id: 0, firstName: '', lastName: '', image: '', email: '' })
  const [postData, setPostData] = useState<IPost>(defaultPost);
  const [rawData, setRawData] = useState<any>();
  const [alert, setAlert] = useState<IAlert>(defaultAlert);
  const { fetchProjectPosts, projectId } = useContext(ProjectContext);

  const params = useParams();
  const userId = +params.user_id!;
  // const postId = +params.post_id!;
  // const projectId = +params.project_id!;

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
        const post: IPost = await fetchPost(postId);
        fetchUser(post.userId);
        console.log('rawData', rawData)
      }
      if (projectId) {
        setPostData(p => {
          p.projectId = projectId
          return p;
        })
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
  async function fetchPost(postId: number): Promise<IPost> {
    const res = await postEdit(postId);
    setPostData(res);
    setRawData(extractRaw(res));
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

  /** retrieves raw data from post: solution, content, problem */
  function extractRaw(post: IPost) {
    const { content, problem, solution } = post;
    return { 'content': content, 'problem': problem, 'solution': solution }
  }

  function handleEditorData(field: string, data: any) {
    setPostData(p => ({
      ...p,
      [field]: data,
    }))
  }

  /**Submit post data */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    //adds post that doesn't correspond to project
    if (userId && !projectId) {
      try {
        await postAdd(postData);
        setPostData(defaultPost);
      } catch (error: any) {
        setAlert(error)
        console.error(`Error adding new post => ${error}`)
      }
    }
    //edit individual post
    if (postId && fetchEditPost) {
      try {
        await postUpdate(postId, postData);
        setPostData(defaultPost);
        fetchProjectPosts();
        fetchEditPost(postId);
      } catch (error: any) {
        console.error(`Error updating post => ${error}`)
      }
    }
    //adds post corresponding to project
    if (projectId && !postId) {
      try {
        await projectPostAdd(userId, projectId, postData);
        setPostData(defaultPost);
        fetchProjectPosts();
      } catch (error: any) {
        console.error(`Error adding project post => ${error}`);
      }
    }
  }

  useEffect(() => { }, [postData])

  return (
    <Container className="w-30">
      <Row >
        <Col className="justify-content-center">
          <Form onSubmit={handleSubmit} className="PostForm-form">
            <Form.Group controlId="form-title">
              <InputGroup.Text>Title:</InputGroup.Text>
              {/* <Form.Label>Title:</Form.Label> */}
              <Form.Control
                type="text"
                className="PostForm-title"
                onChange={handleChange}
                value={postData.title}
                name="title"
              />
            </Form.Group>
            <DraftEditor raw={rawData} onEditorDataChange={handleEditorData} />
            {/* <Button variant="outline-primary" href={`/users/${userId ? userId : postData.userId}`}>Cancel</Button> */}
            <div className="">
              <Button type="submit" variant="primary" onClick={handleClose}>Submit</Button>
              <Button variant="secondary" onClick={handleClose}>Cancel</Button>
            </div>
          </Form>
        </Col>
      </Row>
      {
        alert.error &&
        <AlertPopUp variant={'danger'} message={[alert.error]} />
      }
    </Container>
  )
}

export default PostForm;