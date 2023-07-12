// dependencies
import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import PostForm from './PostForm';
import { ProjectContext } from './userContext';
import ProjectForm from './ProjectForm';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { UserContext } from './userContext';
import AlertBubble from './AlertBubble';

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

  const { user } = useContext(UserContext);

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);
  
  const customDialogClassName = 'custom-modal-dialog';

  function buttonStyle() {
    if(user?.email === 'j@est.com'){
      if (action === 'new post') return <Button onClick={handleShow} className="my-0 py-0" variant="light" style={{ marginLeft: 'auto' }}><FontAwesomeIcon icon={faPlus} /></Button>
      if (action === 'edit') return <div onClick={handleShow}><FontAwesomeIcon icon={faPenToSquare} /></div>
      if (action === 'new project') return <Button onClick={handleShow} className="m-0" variant="light" style={{ marginRight: 'auto' }}><FontAwesomeIcon icon={faPlus} /></Button>
    } else {
      return <AlertBubble action={<FontAwesomeIcon icon={faPlus} />}/>
    }
  }

  function modalAction() {
    return action === 'new project'
      ? <ProjectForm />
      : <PostForm handleClose={handleClose} postId={postId} fetchEditPost={fetchEditPost} />
  }

  function modalHeader(){
    if( action === 'new project') return 'create new project'
    if( action === 'new post') return 'create new post'
    if (action === 'edit') return `edit post for ${ projectName }`
  }
  
  return (
    <>
      {buttonStyle()}
      <Modal dialogClassName={action === 'new post' || action === 'edit' ? customDialogClassName : ''} show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalHeader()} </Modal.Title>
        </Modal.Header>
        <Modal.Body >
          {modalAction()}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default PopOut;