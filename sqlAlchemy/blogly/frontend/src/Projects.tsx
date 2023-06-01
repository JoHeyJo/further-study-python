//dependencies
import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup';
import { Button } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Collapse from 'react-bootstrap/Collapse';
// components/ modules
import { IProject, IUserId, IPosts, IPost } from './interface';
import { postsGet, projectsGet, projectPostsGet } from './api';
import Post from "./Post";
import Posts from "./Posts";
//styles
// import './style/Projects.css';
type ProjectProps = {
  userId: number;
}
/** Renders list of projects by name
 * 
 * Props:
 * - projectId: number
 * 
 * State:
 * - projects: [
 * {
 * id: number;
 * name: string;
 * description: string;
 * userId: number;
  ,{},{}]
 * 
 * User - Projects
 */
function Projects({ userId }: ProjectProps) {
  const [open, setOpen] = useState(false);
  const [projects, setProjects] = useState<IProject[]>([])
  const [projectId, setProjectId] = useState<number | undefined>(0);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [isPostsShowing, setIsPostsShowing] = useState<boolean | undefined | number>(undefined);


  /** On mount fetches users' projects */
  useEffect(() => {
    async function fetchProjects() {
      const res = await projectsGet(userId)
      setProjects(res)
    }
    fetchProjects();
  }, [])

  /** retrieves project's posts */
  async function fetchProjectPosts() {
    console.log('projectID',projectId)
    const res = await projectPostsGet(userId, projectId)
    console.log(res)
    setPosts(res)
  }

  /** controls when slideover opens/closes */
  function isOpen(id: number | undefined) {
    if (!open) {
      // setParentState(true)
      setOpen(true)
    } else if (projectId !== id) {
      setOpen(!open);
      setTimeout(() => {
        setOpen(true);
      }, 500)
    } else {
      setOpen(false)
    }
  }
//rename to isPostsShowing or something like that. The boolean determines whether the Posts slideover is showing
  const handleParentStateChange = () => {
    setIsPostsShowing(!isPostsShowing);
  };

  useEffect(() => {
    setTimeout(() => fetchProjectPosts(), 520)
  }, [projectId])

  return (
    <>
      <h3>Projects</h3>
      <div>

        <Row className="justify-content-center">
          <Col className="col-6">
            <ListGroup className="align-items-start">
              {
                projects.map(project =>
                  <ListGroup.Item key={project.id} className="Projects-post" onClick={() => {
                    setProjectId(project.id);
                    isOpen(project.id);
                    handleParentStateChange();
                  }
                  }>
                    {/* <Link to={`/users/${userId}/projects/${project.id}`}>{project.name}</Link> */}
                    {project.name}
                  </ListGroup.Item>
                )
              }
            </ListGroup>
          </Col>
        </Row>
        <Row className="User-post-details">
          <Col>
            <h3 style={{ width: '400px' }}>Posts</h3>
            <Collapse in={open} dimension="width">
                <Col>
                  <div className="User-posts">
                  <Posts isPostsShowing={isPostsShowing} posts={posts || []}/>

                  </div>
                </Col>
            </Collapse>
          </Col>
        </Row>

      </div>
      <Link to={`/users/${userId}/projects/new`}><Button variant="primary">Create Project</Button></Link>
    </>
  )
}

export default Projects;