//dependencies
import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup';
import { Button } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
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
  setProjectId: (projectId: number | undefined) => void;
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
  const [projectId, setProjectId] = useState<number>();
  const [posts, setPosts] = useState<IPost[]>([]);

  /** On mount fetches users' projects */
  useEffect(() => {
    async function fetchProjects() {
      const res = await projectsGet(userId)
      setProjects(res)
    }
    fetchProjects();
  }, [])

  async function fetchProjectPosts() {
    const res = await projectPostsGet(userId, projectId)
    console.log(res)
    setPosts(res)
  }

  function isOpen(){
    if(open) {
      setOpen(!open);
      setTimeout(() =>{
        setOpen(true);
      }, 500)
    } else {
      setOpen(!open);
    }
  }

  return (
    <>
      <h3>Projects</h3>
      <div>
        <Container>
          <Row className="justify-content-center">
            <Col className="col-6">
              <ListGroup className="align-items-start">
                {
                  projects.map(project =>
                    <ListGroup.Item key={project.id} className="Projects-post" onClick={() => {
                      setProjectId(project.id);
                      isOpen();
                      fetchProjectPosts()
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
              <Collapse in={open} dimension="width">
                <div id="example-collapse-text">
                  <Card body style={{ width: '400px' }}>
                    <Col>
                      <div className="User-posts">
                        <Posts posts={posts || []} />

                      </div>
                    </Col>
                  </Card>
                </div>
              </Collapse>
            </Col>
          </Row>
        </Container>
      </div>
      <Link to={`/users/${userId}/projects/new`}><Button variant="primary">Create Project</Button></Link>
    </>
  )
}

export default Projects;