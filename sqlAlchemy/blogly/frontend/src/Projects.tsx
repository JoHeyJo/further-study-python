//dependencies
import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup';
import { Button } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// components/ modules
import { IProject } from './interface';
import { postsGet, projectsGet } from './api'
//styles
// import './style/Projects.css';

type ProjectId = {
  projectId: number;
}
/** Renders list of posts by title
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
function Projects() {
  const [projects, setProjects] = useState<IProject[]>([])

  /** On mount fetches users' posts */
  useEffect(() => {
    async function fetchProjects() {
      const res = await projectsGet()
      setProjects(res)
    }
    fetchProjects();
  }, [])

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
                    <ListGroup.Item key={project.id} className="Projects-post">
                      <Link to={`/project/${project.id}`}>{project.name}</Link>
                    </ListGroup.Item>
                  )
                }
              </ListGroup>
            </Col>
          </Row>
        </Container>
      </div>
      {/* <Link to={`/users/${'1'}/posts/new`}><Button variant="primary">Add Post</Button></Link> */}
    </>
  )
}

export default Projects;