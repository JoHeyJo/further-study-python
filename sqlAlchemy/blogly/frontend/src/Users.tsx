import React, { useState, useEffect } from "react";
import { IUser } from './interface'
import { getUsers } from "./api";

/** displays list of all users
 * 
 * State:
 * - users: [{},{},{}...]
 * 
 */
function Users() {
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    async function fetchUsers() {
      const res = await getUsers();
      setUsers(res)
    }
    fetchUsers();
  }, [])

  return (
    <>
    <h1>
      Users
    </h1>
      <div>
        {users.map(u => <li key={u.id}> {u.firstName} {u.lastName}</li>)}
      </div>
      <button>Add user</button>

    </>
  )
}

export default Users;