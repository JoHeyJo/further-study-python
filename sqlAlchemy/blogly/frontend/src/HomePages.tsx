import React, { useState, useEffect } from "react";
import { postsGetAll } from './api'
import { IPosts } from "./interface";

/** Homepage for Bugly. Shows 5 most recent posts 
 * 
 * State: 
 * - Posts => [{},{},...]
 * 
*/

function HomePage() {
  const [posts, setPosts] = useState<IPosts>()

  useEffect(()=>{
    async function fetchPosts(){
      const res = await postsGetAll();
      setPosts(res)
    }
  })
  return (
    <>
    {posts.map(post => <li>{post.title}</li>)}
    </>
  )
}

export default HomePage;