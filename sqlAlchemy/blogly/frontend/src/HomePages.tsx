import React, { useState, useEffect } from "react";
import { postsGetAll } from './api'
import { IPosts, IPost } from "./interface";
import { Link } from 'react-router-dom';


/** Homepage for Bugly. Shows 5 most recent posts 
 * 
 * State: 
 * - Posts => [{title: '', content: '', userId: 0, id},{},...]
 * 
*/
function HomePage() {
  const [posts, setPosts] = useState<IPost[]>([])

  useEffect(() => {
    async function fetchPosts() {
      let res = await postsGetAll();
      res.reverse()
      res = res.slice(0,6)
      setPosts(res)
    }
    fetchPosts()
  },[])
  return (
    <>
    <h1>Blogly Recent Posts</h1>
      {posts.map((post,i) => 
      <section key={i}>
        <Link to={`/posts/${post.id}`}>
        <h2>{post.title}</h2></Link>
        <h4>{post.content}</h4>
        <h6>By {post.firstName} {post.lastName} {post.createdAt}</h6>
       </section>
      )}
      
    </>
  )
}

export default HomePage;