//dependencies
import React, { useState, useEffect, useContext } from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Collapse from 'react-bootstrap/Collapse';
import decode from "jwt-decode";

// components/ modules
import { IProject, IPost } from './interface';
import { projectsGet, projectPostsGet } from './api';
import Posts from "./Posts";
import { ProjectContextType, ProjectContext, UserContext } from "./userContext";
import AlertModal from "./AlertModal";
import PopOut from "./PopOut";

//styles
import './style/Projects.css';

type ProjectProps = {
  userId?: number;
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
  ,{},{}]π
 * 
 * User - Projects
 */
function Projects({ userId }: ProjectProps) {
  const [open, setOpen] = useState(false);
  const [projects, setProjects] = useState<IProject[]>([])
  const [projectData, setProjectData] = useState<ProjectData>({ name: '', id: 0 });
  const [posts, setPosts] = useState<IPost[]>([]);
  const [isPostsShowing, setIsPostsShowing] = useState<boolean | undefined | number>(false);

  const { user } = useContext(UserContext);

  const ProjectData: ProjectContextType = {
    projectId: projectData.id,
    projectName: projectData.name,
    fetchProjectPosts,
    setProjects,
    getProject,
  }

  /**gets projects */
  async function getProject() {
    const res = await projectsGet(userId);
    console.log('project get in Projects')
    setProjects(res);
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
    console.log('fetching project posts',res)
    setPosts(res)
  }

  /** controls when slideover opens/closes */
  function isOpen(id: number | undefined, e: any) {
    if (!open) {
      // if closed, open slideover
      setOpen(true)
    }  else if (id !== projectData.id) {
      // if opening a different project, close current and open new project
      setOpen(!open);
      setTimeout(() => {
        setOpen(true);
      }, 500)
    }  else {
      setOpen(false)
    }
  }

  const handleParentStateChange = () => {
    setIsPostsShowing(!isPostsShowing);
  };

  useEffect(() => {
    setTimeout(() => fetchProjectPosts(), 520)
  }, [projectData])


  return (
    <>
      <h3 className="Projects-title">
        Projects
        <PopOut getProject={getProject} action={'new project'} postId={undefined} fetchEditPost={undefined} />
      </h3>
      <div>

        <Row className="Projects-container">
          <Col className="col-6">
            <ListGroup className="align-items-start">
              {
                projects.map(project =>
                  <ListGroup.Item key={project.id} className={projectData.id === project.id ? "Projects-project selected" : "Projects-project"} onClick={(e) => {
                    setProjectData(p => ({
                      ...p, name: project.name, id: project.id
                    }
                    ))
                  }}>
                    <div
                      style={{ all: 'unset' }} onClick={(e) => {
                        isOpen(project.id, e)
                      }}
                    >
                      {project.name}
                      {' - '}
                      {project.description}
                    </div>
                    <AlertModal projectData={projectData} projectGet={getProject} isOpen={setOpen} />
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
                    <Posts isPostsShowing={handleParentStateChange} posts={posts || []} />
                  </ProjectContext.Provider>
                </div>
              </Col>
            </Collapse>
          </Col>
        </Row>

      </div>
    </>
  )
}

export default Projects;