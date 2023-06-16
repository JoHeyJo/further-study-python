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
import { IPost } from './interface';
import { postGet } from './api'
import Post from "./Post";
import PopOut from "./PopOut";
import { PostContextType, PostContext } from "./userContext";

//styles
import './style/Posts.css';

type PostsProps = {
  posts: IPost[];
  isPostsShowing: any;
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
function Posts({ posts, isPostsShowing }: PostsProps) {
  const [isPostRendering, setIsPostRendering] = useState<boolean>(false)
  const [post, setPost] = useState<IPost>()

  /** fetches Project post onClick */
  async function fetchPost(postId: number) {
    console.log('Posts - fetching edited post', post)
    const res = await postGet(postId);
    setPost(res);
  }

  /** Sets boolean state if a post should be rendering */
  function handlePostRender() {
    setIsPostRendering(true);
  }

  useEffect(() => {
    // Update child state when parent state changes
    setIsPostRendering(false);
    setPost(undefined)
  }, [isPostsShowing]);

  return (
    <>
      <div>
        <Container>
          <Row className="justify-content-center">
            <Col className="col-4">
              <Card body style={{ width: '380px' }}>
                <ListGroup className="align-items-start">
                  <PopOut postId={undefined} fetchEditPost={fetchPost} />
                  {
                    posts.map(post =>
                      <ListGroup.Item key={post.id} className="Posts-post" onClick={() => {
                        fetchPost(post.id);
                        handlePostRender();
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
              {isPostRendering && post && <Post post={post} handlePostRender={setIsPostRendering} fetchEditPost={fetchPost}/>}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default Posts;
