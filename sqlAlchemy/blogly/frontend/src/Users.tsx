//dependencies
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Button, Container } from "react-bootstrap";
//components
import { IUser } from './interface'
import { usersGet } from "./api";
import HomePage from "./HomePages";
// style
import './style/Users.css';


const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY4ODQ4OTk3NywianRpIjoiNTRlMzMwZWMtNzhjNS00ZGU2LThiYjQtY2YwNWIzY2NjM2I4IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6ImpAdGVzdC5jb20iLCJuYmYiOjE2ODg0ODk5NzcsImV4cCI6MTY4ODQ5MDg3N30.4lIVoGSMIY8m0Yi8TiH4c5O68M7xwb7BnSRhW8bxfXg";
/** displays list of all users
 * 
 * State:
 * - users: [{},{},{}...]
 * 
 */
function Users() {
  const [users, setUsers] = useState<IUser[]>([]);

  /**Fetches all users from database */
  useEffect(() => {
    async function fetchUsers() {
      const res = await usersGet(token);
      setUsers(res)
    }
    fetchUsers();
  }, [])

  return (
    <Container>
      <div className="Users-container">
        <h1>
          Users
        </h1>
        <div className="Users-box">
          {users.map(u => <li key={u.id} className="Users-user"><Link to={`/users/${u.id}`} > {u.firstName} {u.lastName}</Link></li>)}
        </div>
        <Link to="/form">
          <Button variant="primary">Add user</Button>
        </Link>
        <HomePage />
      </div>
    </Container>
  )
}

export default Users;