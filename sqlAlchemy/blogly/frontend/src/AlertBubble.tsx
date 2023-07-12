import { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';

type AlertBubbleProp = {
  action: any;
}
function AlertBubble({action}: AlertBubbleProp) {
  const [show, setShow] = useState(false);
  const target = useRef(null);

  return (
    <>
      <Button className="my-0 py-0" variant="light"  ref={target} onClick={() => setShow(!show)}>
        {action}
      </Button>
      <Overlay target={target.current} show={show} placement="right">
        {(props) => (
          <Tooltip id="overlay-example" {...props}>
            My Tooltip
          </Tooltip>
        )}
      </Overlay>
    </>
  );
}

export default AlertBubble;