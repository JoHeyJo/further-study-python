//dependencies
import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup';
import { Button } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// components/ modules
import { IPostData, IUserId } from './interface';
import { postsGet } from './api'
//styles
import './style/Posts.css';

type PostsProps = {
  userId: number;
  setId: (userId: number) => undefined;
}
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
function Posts({ userId, setId }: PostsProps) {
  const [posts, setPosts] = useState<IPostData[]>([])

  /** On mount fetches users' posts */
  useEffect(() => {
    async function fetchPosts() {
      const res = await postsGet(userId)
      setPosts(res)
    }
    fetchPosts();
  }, [])

  function setUserId(userId:number):undefined{
    setId(userId)
    return undefined
  }

  return (
    <>
      <h3>Posts</h3>
      <div>
        <Container>
          <Row className="justify-content-center">
            <Col className="">
              <ListGroup className="align-items-start">
                {
                  posts.map(post =>
                    <ListGroup.Item key={post.id} className="Posts-post" onClick={setUserId(post.id)}>
                      {/* <Link to={`/posts/${post.id}`}>{post.title}</Link> */}
                      {post.title}
                    </ListGroup.Item>
                  )
                }
              </ListGroup>
            </Col>
          </Row>
        </Container>
      </div>
      <Link to={`/users/${userId}/posts/new`}><Button variant="primary">Add Post</Button></Link>
    </>
  )
}

export default Posts;
