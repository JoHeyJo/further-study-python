import React, { useState, useEffect } from "react";
import { postsGetAll } from './api'
import { IPosts, IPost } from "./interface";


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
      const res = await postsGetAll();
      setPosts(res)
    }
    fetchPosts()
  },[])
  return (
    <>
    <h1>Blogly Recent Posts</h1>
      {posts.map((post,i) => 
      <section key={i}>
        <h2>{post.title}</h2>,
        <h4>{post.content}</h4>
        <h6>By {post.firstName} {post.lastName} {post.createdAt}</h6>
      </section>
      )}
    </>
  )
}

export default HomePage;