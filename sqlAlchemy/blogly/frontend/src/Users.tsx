//dependencies
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
//components
import { IUser } from './interface'
import { getUsers } from "./api";
// style
import './style/Users.css';

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
      const res = await getUsers();
      setUsers(res)
    }
    fetchUsers();
  }, [])

  return (
    <div className="Users-container">
      <h1>
        Users
      </h1>
      <div className="Users-box">
        {users.map(u => <li key={u.id}><Link to={`/user/${u.id}`} className="Users-user"> {u.firstName} {u.lastName}</Link></li>)}
      </div>
      <Link to='/form'>
        <button>Add user</button>
      </Link>

    </div>
  )
}

export default Users;