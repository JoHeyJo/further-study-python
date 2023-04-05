//dependencies
import React from "react";
import Button from 'react-bootstrap/Button';
//components / modules
import { IPost } from './interface';

/** Renders individual post
 * 
 * Props:
 * - title: ''
 * content: ''
 * 
 * Posts -> Post
 */
function Post({ title, content }: IPost) {
  return (
    <div>
      <h1 className="Post-title">{title}</h1>
      <h3 className="Post-content">{content}</h3>
      <h4 className="Post-author">author</h4>
      <div className="Post-controls">
        <Button variant="outline-primary">Cancel</Button>
        <Button variant="primary">Edit</Button>
        <Button variant="danger">Delete</Button>
      </div>
    </div>
  )
}

export default Post;