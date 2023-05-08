//dependencies
import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import { Container } from "react-bootstrap";
import Stack from 'react-bootstrap/Stack';
//components / modules
import { projectGet } from './api';
import { IProject } from "./interface";


const defaultProject: IProject = {
  id: undefined, name: '', description: '', userId: undefined
}
/** Renders project 
 * 
 * State:
 * - project = {}
*/
function Project() {
  const [project, setProject] = useState<IProject>(defaultProject)

  const params = useParams();
  const projectId = +params.project_id!;

  /** fetches project on mount*/
  useEffect(() => {
    async function fetchProject() {
      const res = await projectGet(projectId);
      setProject(res);
    }
    fetchProject();
  }, [])

  return (
    <>
      <Container>
        <Stack>
          <h1>{project.name}</h1>
          <h3>{project.description}</h3>
        </Stack>
      </Container></>
  )
}

export default Project;