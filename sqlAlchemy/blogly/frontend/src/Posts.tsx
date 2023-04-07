//dependencies
import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom'
// components/ modules
import { IPost, IUserId } from './interface';
import { postsGet } from './api'
import { Button } from "react-bootstrap";


/** Renders list of posts by title
 * 
 * Props:
 * - userId: number
 * 
 * State:
 * - posts: [{title='',content=''},{},{}]
 * 
 * User - Posts
 */
function Posts({userId}: IUserId) {

  const [posts, setPosts] = useState<IPost[]>([])

  /** On mount fetches users' posts */
  useEffect(() => {
    async function fetchPosts() {
      const res = await postsGet(userId)
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
      <Link to={`/users/${userId}/posts/new`}><Button variant="primary">Add Post</Button></Link>
    </>
  )
}

export default Posts;
