// dependencies
import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import PostForm from './PostForm';
import { ProjectContext } from './userContext';

type PopOutProp = {
  postId: number | undefined;
  fetchEditPost?: (postId: number) => void;
}

function PopOut({ postId, fetchEditPost }: PopOutProp) {
  const [show, setShow] = useState(false);
  const { projectName } = useContext(ProjectContext);

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  return (
    <>
      {postId
        ? <Button onClick={handleShow}>Edit</Button>
        :
        <Button onClick={handleShow} className="my-0 py-0" variant="light" style={{ marginLeft: 'auto' }}><FontAwesomeIcon icon={faPlus} /></Button>
      }
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create post for {projectName}</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          {fetchEditPost && <PostForm handleClose={handleClose} postId={postId} fetchEditPost={fetchEditPost}/> }
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