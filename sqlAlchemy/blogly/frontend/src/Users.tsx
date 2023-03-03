import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { IUser } from './interface'
import { getUsers } from "./api";
import './Users.css';

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
        {users.map(u => <li><Link to={`/user/${u.id}`} key={u.id} className="Users-user"> {u.firstName} {u.lastName}</Link></li>)}
      </div>
      <button>Add user</button>

    </div>
  )
}

export default Users;