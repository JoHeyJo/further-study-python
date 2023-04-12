//dependencies
import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom'
// components/ modules
import { IPostData, IUserId } from './interface';
import { postsGet } from './api'
import { Button } from "react-bootstrap";

/** Renders list of posts by title
 * 
 * Props:
 * - userId: number
 * 
 * State:
 * - posts: [
 * {
 * id: number;
 * title='',
 * content='',  
 * title: '', 
  firstName: '';
  lastName: '';
  user_id: number;
  created_at: '';
  imageUrl: '' | null;}
  ,{},{}]
 * 
 * User - Posts
 */
function Posts({userId}: IUserId) {
  const [posts, setPosts] = useState<IPostData[]>([])
  console.log('userId', userId)
  /** On mount fetches users' posts */
  useEffect(() => {
    console.log('userId',userId)
    async function fetchPosts() {
      const res = await postsGet(userId)
      console.log(res)
      setPosts(res)
    }
    fetchPosts();
  }, [])

  return (
    <>
      <h3>Posts</h3>
      <div>{
        posts.map(post => <li key={post.id}className="Posts-post"><Link to={`/posts/${post.id}`}>{post.title}</Link></li>)
      }
      </div>
      <Link to={`/users/${userId}/posts/new`}><Button variant="primary">Add Post</Button></Link>
    </>
  )
}

export default Posts;
