// dependencies
import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import PostForm from './PostForm';
import { ProjectContext } from './userContext';
import ProjectForm from './ProjectForm';

type PopOutProp = {
  action: string;
  postId: number | undefined;
  fetchEditPost?: (postId: number) => Promise<void>;
}


/** Popout component 
 * 
 * [Projects, Posts, Post ] => PopOut
 */
function PopOut({ action, postId, fetchEditPost }: PopOutProp) {
  const [show, setShow] = useState(false);
  const { projectName } = useContext(ProjectContext);


  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  function buttonStyle() {
    if (action === 'new post') return <Button onClick={handleShow} className="my-0 py-0" variant="light" style={{ marginLeft: 'auto' }}><FontAwesomeIcon icon={faPlus} /></Button>
    if (action === 'edit') return <Button onClick={handleShow}>Edit</Button>
    if (action === 'new project') return <Button onClick={handleShow} className="my-0 py-0" variant="light" style={{ marginRight: 'auto' }}><FontAwesomeIcon icon={faPlus} /></Button>
  }

  function modalAction() {
    const modalAction = action === 'new project'
      ? <ProjectForm />
      : <PostForm handleClose={handleClose} postId={postId} fetchEditPost={fetchEditPost} />
    return modalAction;
  }
  return (
    <>
      {buttonStyle()}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create post for {projectName}</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          {modalAction()}
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
}

export default PopOut;