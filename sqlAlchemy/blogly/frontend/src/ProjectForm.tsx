//dependencies
import React, { useEffect, useState } from 'react';
import { Alert, Button } from "react-bootstrap";
import { useNavigate, useLocation, useParams } from "react-router-dom";
//components
import { projectAdd, projectUpdate, projectEdit } from './api';
import { IAlert, IProject } from './interface';
// style
import AlertPopUp from './AlertPopUp';

const defaultProject: IProject = { id: undefined, name: undefined, description: undefined, userId: undefined };
const defaultAlert: IAlert = { error: null };

/** Handles user information and renders form for new/edit project
 * 
 * Props:
 * 
 * State:
 * - user {id:number, name:string, description:string, userId:number}
 * 
 * App -> Form
 */
function ProjectForm() {
  const [project, setProject] = useState<IProject>(defaultProject);
  const [alert, setAlert] = useState<IAlert>(defaultAlert)
  const navigate = useNavigate();

  // const location = useLocation();
  // const userId = location.state?.userId;
  const params = useParams();
  const userId = +params.user_id!;
  const projectId = undefined;

  /** Handles changes to form state */
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setProject(data => ({
      ...data,
      [name]: value,
    }))
  }

  /** Fetches existing user to edit though API*/
  async function fetchProject(id: number | undefined) {
    try {
      let res = await projectEdit(id)
      setProject(project);
    } catch (error: any) {
      console.error(`Error: fetchProject => ${error}`)
    }
  }

  /** send user data to api */
  async function submitProject(e: any) {
    e.preventDefault();
    try {
      if (projectId) {
        // update project
        let res = await projectUpdate(userId, project)
        setProject(defaultProject)
        navigate('/')
      } else {
        // add project
        let res = await projectAdd(userId, project)
        setProject(defaultProject);
        navigate('/');
      }
    } catch (error: any) {
      setAlert(error)
      console.error(error)
    }
  }

  /** calls fetchProject on mount, if a user id is passed on render */
  useEffect(() => {
    try {
      if (userId) {
        fetchProject(userId);
      }
    } catch (error: any) {
      console.error(error)
    }
  }, [])

  return (
    <>
      <form className='Form-input' onSubmit={submitProject}>
        <label htmlFor='name-input'>Project Name</label>
        <input onChange={handleChange}
          name="name"
          id="name-input"
          className='Form-name'
          placeholder='Project Name:'
          value={project.name}>
        </input>
        <label htmlFor='description-input'>Description</label>
        <input onChange={handleChange}
          name="description"
          id="description-input"
          className='Form-description'
          placeholder='Description:'
          value={project.description}>
        </input>

        <Button type='submit'>{!project.id ? 'Add Project' : 'Update Project'}</Button>
        {project.id !== 0
          ? <Button type='submit' onClick={() => navigate(`/users/${project.id}/`)}>Cancel</Button>
          : <Button type='submit' onClick={() => navigate('/')}>Cancel</Button>
        }

        {
          alert.error &&
          <AlertPopUp variant={'danger'} message={alert.error} />
        }

      </form>
    </>
  )
}

export default ProjectForm;