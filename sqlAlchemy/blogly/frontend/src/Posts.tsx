//dependencies
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
// components/ modules
import { IPost, IUserId } from './interface';
import { getPosts } from './api'


/** Renders list of posts by title
 * 
 * Props:
 * - userId: number
 * 
 * State:
 * - posts: [{title='',content=''},{},{}]
 */
function Posts({userId}: IUserId) {
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
      <h3>Posts</h3>
      <div>{
        posts.map(post => <Link to={`/posts/${post.id}`}><li className="Posts-post">{post.title}</li></Link>)
      }
      </div>
    </>
  )
}

export default Posts;
