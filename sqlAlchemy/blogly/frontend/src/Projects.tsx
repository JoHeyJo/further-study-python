//dependencies
import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup';
import { Button } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// components/ modules
import { IProject, IUserId } from './interface';
import { postsGet, projectsGet } from './api'
//styles
// import './style/Projects.css';
type ProjectProps = {
  userId: number;
  onClick: () => void;
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
function Projects({ userId, onClick, setProjectId }: ProjectProps) {
  const [projects, setProjects] = useState<IProject[]>([])

  /** On mount fetches users' projects */
  useEffect(() => {
    async function fetchProjects() {
      const res = await projectsGet(userId)
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
                    <ListGroup.Item key={project.id} className="Projects-post" onClick={() => {
                      onClick();
                      setProjectId(project.id);
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
        </Container>
      </div>
      <Link to={`/users/${userId}/projects/new`}><Button variant="primary">Create Project</Button></Link>
    </>
  )
}

export default Projects;