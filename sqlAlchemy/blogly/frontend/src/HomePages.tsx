import React, { useState, useEffect } from "react";
import { postsGetAll } from './api'
import { IPosts, IPost } from "./interface";

const defaultPosts: IPost = { title: '', content: '', userId: 0 }

/** Homepage for Bugly. Shows 5 most recent posts 
 * 
 * State: 
 * - Posts => [{},{},...]
 * 
*/
function HomePage() {
  const [posts, setPosts] = useState<IPost[]>([])

  useEffect(() => {
    async function fetchPosts() {
      const res = await postsGetAll();
      setPosts(res)
    }
    fetchPosts()
  },[])
  return (
    <>
      {posts.map(post => <li>{post.title}</li>)}
    </>
  )
}

export default HomePage;