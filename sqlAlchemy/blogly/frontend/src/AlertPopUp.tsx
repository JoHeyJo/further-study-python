import { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';

type AlertProp = {
  variant: string;
  message: string | null;
}
// color schemes for Alert component
// 'primary',
//   'secondary',
//   'success',
//   'danger',
//   'warning',
//   'info',
//   'light',
//   'dark',

/** Alert component that can be used for a variaty of notifications */
function AlertPopUp({ variant, message }: AlertProp) {
  const [isShowing, setIsShowing] = useState<boolean>(true);

  // const show = () => {
  //   setIsShowing(true)

  //   setTimeout(() => {
  //     setIsShowing(false)
  //   }, 2000)
  // }

  // useEffect(() => show(),[])
  return (
    <>
      {
        isShowing &&
        <Alert key={variant} variant={variant}>
          {message}
        </Alert>
      }
    </>
  );
}

export default AlertPopUp;