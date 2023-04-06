//dependencies
import React, { useState, useEffect } from "react";
// components/ modules
import { IPost } from './interface';
import { getPosts } from './api'

/** Renders list of posts by title
 * 
 * Props:
 * - userId: number
 * 
 * State:
 * - posts: [{title='',content=''},{},{}]
 */
function Posts(userId: any) {
  const [posts, setPosts] = useState<IPost[]>([])

  useEffect(() => {
    async function fetchPosts() {
      const res = await getPosts(userId)
      setPosts(res)
    }
    fetchPosts();
  }, [])


  return (
    <>
      <h2>Posts</h2>
      <div>{posts.map(post => <p className="Posts-post">{post.title}</p>)}</div>
    </>
  )
}

export default Posts;