//modules 
import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Routes, Route, Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Collapse from 'react-bootstrap/Collapse';
//components / modules
import { IUser } from './interface'
import { userGet, userDelete } from './api'
import UserForm from './UserForm'
import Posts from './Posts';
import Projects from "./Projects";
// style
import './style/User.css'
import img from './default.png'

const defaultUser: IUser = { id: 0, firstName: '', lastName: '', image: '' }

/** Displays user information
 * 
 * State:
 * - user: {id: number, firstName: string, lastName: string}
 * 
 * Users -> User
 */
function User() {
  const [user, setUser] = useState<IUser>(defaultUser)
  const navigate = useNavigate();
  const params = useParams();
  const [open, setOpen] = useState(false);

  /** fetches user with matching ID from database */
  useEffect(() => {
    async function fetchUser(id: number | undefined) {
      const res = await userGet(id);
      setUser(res)
    }
    fetchUser(+params.user_id!)
  }, [])

  /** navigates to user edit page */
  const handleClick = () => {
    navigate(`/users/${user.id}/edit`, {
      state: { userId: user.id }
    });
  };

  /** passes user ID to API delete function */
  async function removeUser(userId: number) {
    try {
      const res = await userDelete(userId);
      navigate('/')
    } catch (error: any) {
      console.error("User: Issue removing user" + error)
    }
  }

  return (
    <Container className="User-container">
      <Row>
        <Col className="col-3">
          <img src={img} alt={`${user.firstName || 'default profile'} profile picture`} height="400px" width="400px"></img>
          <div className="User-user">
            <div className="User-fn">{user.firstName}</div>
            <div className="User-ln">{user.lastName}</div>
          </div>
          <Button variant="primary" onClick={handleClick}>Edit</Button>
          <Button variant="danger" onClick={() => removeUser(user.id)}>Delete</Button>
        </Col>
        <Col>
          <div className="User-posts"><Posts userId={+params.user_id!} /></div>
        </Col>
        <Col>
          <div className="User-posts"><Projects userId={+params.user_id!} /></div>
        </Col>
      </Row>
      <Row>
        <Col>
      <Button
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
      >
        click
      </Button>
      <div style={{ minHeight: '150px' }}>
        <Collapse in={open} dimension="width">
          <div id="example-collapse-text">
            <Card body style={{ width: '400px' }}>
              Anim pariatur cliche reprehenderit, enim eiusmod high life
              accusamus terry richardson ad squid. Nihil anim keffiyeh
              helvetica, craft beer labore wes anderson cred nesciunt sapiente
              ea proident.
            </Card>
          </div>
        </Collapse>
      </div>
        </Col>
      </Row>
      <Row>

      </Row>
    </Container>
  )
}

export default User