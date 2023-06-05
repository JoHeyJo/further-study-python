// dependencies
import { useContext, useState, useEffect, useCallback } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import PostForm from './PostForm';
import { ProjectContext } from './userContext';

function PopOut() {
  const [show, setShow] = useState(false);
  const { projectName, fetchProjectPosts  } = useContext(ProjectContext);

  const handleClose = () => {
    setShow(false);
    // fetchProjects();
  }
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (!show) {
      console.log('calling fetchprojectposts')
      fetchProjectPosts();
    }
  }, [show]);
  
  // useEffect(() => {
  //   if (!show) {
  //     const fetchData = async () => {
  //       console.log('calling fetchprojectposts');
  //       await fetchProjectPosts();
  //     };
  //     fetchData();
  //   }
  // }, [show]);

  return (
    <>
      <Button onClick={handleShow} className="my-0 py-0" variant="light" style={{ marginLeft: 'auto' }}><FontAwesomeIcon icon={faPlus} /></Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create post for {projectName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PostForm handleClose={handleClose}/>
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