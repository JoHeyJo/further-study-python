//dependencies
import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup';
import { Button } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

// components/ modules
import { IPostData, IUserId, IPost } from './interface';
import { postsGet, postGet } from './api'
import Post from "./Post";
//styles
import './style/Posts.css';

type PostsProps = {
  posts: IPost[];
  childState: any;
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
function Posts({ posts, childState }: PostsProps ) {
  const [post, setPost] = useState<any>()
  console.log('childstate>>>>>',childState)

  // /** On mount fetches users' posts */
  // useEffect(() => {
  //   async function fetchPosts() {
  //     const res = await postsGet(userId)
  //     setPosts(res)
  //   }
  //   fetchPosts();
  // }, [])

  /** On mount fetches project's posts */
  // useEffect(()=>{

// if(!childState) setPost(null);

  /** fetches Project post onClick */
  async function fetchPost(postId: any) {
    const res = await postGet(postId);
    console.log(res);
    setPost(res);
  }


  return (
    <>
      <div>
        <Container>
          <Row className="justify-content-center">
            <Col className="">
              <Card body style={{ width: '380px' }}>
                <ListGroup className="align-items-start">
                  {
                    posts.map(post =>
                      <ListGroup.Item key={post.id} className="Posts-post" onClick={() => {
                        fetchPost(post.id);
                      }
                      }>
                        {/* <Link to={`/posts/${post.id}`}>{post.title}</Link> */}
                        {post.title}
                      </ListGroup.Item>
                    )
                  }
                </ListGroup>
              </Card>
            </Col>
            <Col>
             {post && <Post post={post} />}
            </Col>
          </Row>
        </Container>
      </div>
      {/* <Link to={`/users/${userId}/posts/new`}><Button variant="primary">Add Post</Button></Link> */}
    </>
  )
}

export default Posts;
