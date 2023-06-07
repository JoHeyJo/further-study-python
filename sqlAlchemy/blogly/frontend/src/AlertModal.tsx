import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import "./style/AlertModal.css";
import { projectDelete } from './api';
import { IProject } from './interface';

type ProjectData = {
  name?: string;
  id?: number;
}

type AlertModalProps = {
  projectData: ProjectData;
}
/** show alerts for Project. (refactor to be an edit modal)
 * 
 * 
 *  Projects -> AlertModal
 */
function AlertModal({ projectData }: AlertModalProps) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  /**Deletes project and associated posts */
  async function deleteProject() {
    try {
      const res = await projectDelete(projectData.id,)
      console.log('response in delete', res)
    } catch (error: any) {
      console.error(`Error in deleteProject =>${error}`)
    }
  }

  return (
    <>
      <button className="btn btn-custom" onClick={handleShow}>
        <FontAwesomeIcon icon={faPenToSquare} className="font-icon" />
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{`Delete ${projectData.name}`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>...this will delete all associated posts as well.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={() => {
            handleClose();
            deleteProject();
          }}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AlertModal;