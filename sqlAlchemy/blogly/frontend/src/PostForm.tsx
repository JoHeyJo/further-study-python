import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { userGet } from './api';
import { IUser } from "./interface";

/** Handles/ submits post data & renders form for new post 
 * 
 * State:
 * - post = {title:'', content:''}
 * 
 * Post -> PostForm
*/
function PostForm({}){
  const [user, setUser] = useState<IUser>({id:0,firstName:'',lastName:'', image:''})

  const params = useParams();
  const userId = +params.id!

  useEffect(() => {
    async function fetchUser(){
      const res = await userGet(userId);
      setUser(res);
    };
    fetchUser();
  },[])


  return (
    <>
    <h1>Add Post for {user.firstName} {user.lastName}</h1>
    <form>
      
    </form>
    </>
  )
}

export default PostForm;