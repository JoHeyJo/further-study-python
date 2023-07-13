import { useState, useRef, ReactNode } from 'react';
import Button from 'react-bootstrap/Button';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';

type AlertBubbleProp = {
  action: string;
  icon?: ReactNode;
}

type actionProperties = {
  [key: string] : {
    label: string;
    class: string;
    variant: string;
    style: string;
    message: string;
  }
}

const actionProperties: actionProperties = {
  newPost: {
    label: 'Add Post',
    class: "my-0 py-0",
    variant: "light",
    style: "marginLeft: 'auto'",
    message: "You need to be logged in to add a Project"
  },
  edit: {
    label: 'Edit Project',
    class: "my-0 py-0",
    variant: "light",
    style: "marginLeft: 'auto'",
    message: "You need to be logged in to edit a Post"
  },
  addProject: {
    label: 'Add Project',
    class: "my-0 py-0",
    variant: "light",
    style: "marginLeft: 'auto'",
    message: "You need to be logged in to add a Project"
  }
}

function AlertBubble({action, icon}: AlertBubbleProp) {
  const [show, setShow] = useState(false);
  const target = useRef(null);

  return (
    <>
      <Button className={actionProperties[action].class} variant={actionProperties[action].variant} ref={target} onClick={() => setShow(!show)}>
        {actionProperties[action].label}
      </Button>
      <Overlay target={target.current} show={show} placement="right">
        {(props) => (
          <Tooltip id="overlay-example" {...props}>
            {actionProperties[action].message}
          </Tooltip>
        )}
      </Overlay>
    </>
  );
}

export default AlertBubble;