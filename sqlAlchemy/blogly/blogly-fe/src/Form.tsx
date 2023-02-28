import React, { useState } from 'react';
import './Form.css';

/** Handles user information
 * 
 * Props:
 * 
 * State:
 * - user {firstName:string, lastName:string, imgUrl:string}
 * 
 * App -> Form
 */
function Form() {
  const [user, setUser] = useState();

  function onChange(){
    
  }

  return (
    <div className='Form-input'>
      <textarea className='Form-first-name' placeholder='First Name:'></textarea>
      <textarea className='Form-last-name' placeholder='Last Name:'></textarea>
      <textarea className='Form-imgUrl' placeholder='Image URL:'></textarea>
    </div>
  )
}

export default Form;