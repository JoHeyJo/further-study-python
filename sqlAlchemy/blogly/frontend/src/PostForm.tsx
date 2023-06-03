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
import { ProjectContext } from "./userContext";
//styles
import './style/PostForm.css';

type PostFormProp = {
  handleClose: () => void | undefined;
}
const defaultPost: IPost = { title: undefined, content: '', userId: 0, firstName: '', lastName: '', id: 0, createdAt: '', problem: '', solution: '', projectId: 0 }
const defaultAlert: IAlert = { error: null };
/** Handles/ submits post data & renders form for new post 
 * 
 * State:
 * - user: {id:0,firstName:'',lastName:'', image:''}
 * - post = {title:'', content:''}
 * 
 * Post -> PostForm
*/
function PostForm({ handleClose }: PostFormProp) {
  const [userData, setUserData] = useState<IUser>({ id: 0, firstName: '', lastName: '', image: '' })
  const [postData, setPostData] = useState<IPost>(defaultPost);
  const [alert, setAlert] = useState<IAlert>(defaultAlert);

  const params = useParams();
  const userId = +params.user_id!;
  const postId = +params.post_id!;
  // const projectId = +params.project_id!;

  const { projectId } = useContext(ProjectContext);
  console.log(' PostFomr projectId', projectId)
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

      if (projectId){
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
    if (userId && !projectId) {
      try {
        await postAdd(postData);
        setPostData(defaultPost);
        navigate(`/users/${userId}`);
      } catch (error: any) {
        console.log(error)
        setAlert(error)
        console.error(`Error adding new post => ${error}`)
      }
    }
    if (postId) {
      try {
        await postUpdate(postId, postData);
        setPostData(defaultPost);
        navigate(`/users/${postData.userId}`);
      } catch (error: any) {
        console.error(`Error updating post => ${error}`)
      }
    }
    if (projectId) {
      try {
        await projectPostAdd(userId, projectId, postData);
        setPostData(defaultPost);
        navigate(`/users/${postData.userId}`);
      } catch (error: any) {
        console.error(`Error adding project post => ${error}`)
      }
    }
  }
  console.log(alert.error)
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

            <Form.Group controlId="form-content">
              <InputGroup.Text>Content:</InputGroup.Text>
              {/* <Form.Label>Content:</Form.Label> */}
              <Form.Control
                as="textarea"
                className="PostForm-control"
                onChange={handleChange}
                value={postData.content}
                name="content"
              />
            </Form.Group>

            <Form.Group controlId="form-problem">
              <InputGroup.Text>Problem:</InputGroup.Text>
              {/* <Form.Label>Problem:</Form.Label> */}
              <Form.Control
                as="textarea"
                // id="PostForm-control-problem"
                className="PostForm-control input"
                onChange={handleChange}
                value={postData.problem}
                name="problem"
              />
            </Form.Group>

            <Form.Group controlId="form-solution">
              <InputGroup.Text>Solution:</InputGroup.Text>
              {/* <Form.Label>Solution:</Form.Label> */}
              <Form.Control
                as="textarea"
                // id="PostForm-control-solution"
                className="PostForm-control input"
                onChange={handleChange}
                value={postData.solution}
                name="solution"
              />
            </Form.Group>

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
        <AlertPopUp variant={'danger'} message={alert.error} />
      }
    </Container>
  )
}

export default PostForm;