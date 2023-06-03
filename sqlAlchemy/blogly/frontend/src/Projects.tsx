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
import { ProjectContextType, ProjectContext } from "./userContext";

//styles
// import './style/Projects.css';

type ProjectProps = {
  userId: number;
}

type ProjectData = {
  name?: string;
  id?: number;
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
  // const [projectId, setProjectId] = useState<number | undefined>(0);
  const [projectData, setProjectData] = useState<ProjectData>({name:'', id: 0});
  const [posts, setPosts] = useState<IPost[]>([]);
  const [isPostsShowing, setIsPostsShowing] = useState<boolean | undefined | number>(undefined);

  const ProjectData: ProjectContextType = {
    projectId: projectData.id,
    projectName: projectData.name,
  } 

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
    const res = await projectPostsGet(userId, projectData.id)
    console.log(res)
    console.log('fetchProjectPosts is being called')
    setPosts(res)
  }

  /** controls when slideover opens/closes */
  function isOpen(id: number | undefined) {
    if (!open) {
      setOpen(true)
    } else if (projectData.id !== id) {
      setOpen(!open);
      setTimeout(() => {
        setOpen(true);
      }, 500)
    } else {
      setOpen(false)
    }
  }
  //The boolean determines whether the Posts slideover is showing
  const handleParentStateChange = () => {
    setIsPostsShowing(!isPostsShowing);
  };

  useEffect(() => {
    setTimeout(() => fetchProjectPosts(), 530)
  }, [projectData, posts])

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
                    setProjectData(p => ({
                     ...p, name: project.name, id: project.id 
                    }))
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
                  <ProjectContext.Provider value={ProjectData}>
                    <Posts isPostsShowing={isPostsShowing} posts={posts || []} />

                  </ProjectContext.Provider>

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