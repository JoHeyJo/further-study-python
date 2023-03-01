import React, { useState, useEffect } from "react";
import { IUser } from './interface'
import { getUser } from "./api";

/** displays list of all users
 * 
 * State:
 * - users: [{},{},{}...]
 * 
 */
function Users() {
  const [users, setUsers] = useState<IUser[]>([]);


  /** fetches all users in database on every render */
  // async function fetchUsers(){
  //   const res = await getUser();
  //   setUsers(res)
  // }

  useEffect(()=>{
    async function fetchUsers() {
      const res = await getUser();
      setUsers(res)
    }
    fetchUsers();
  },[])

  // fetchUsers();

  return (
    <div>
      {users.map(u => <div> {u.firstName} {u.lastName}</div>)}
    </div>
  )
}

export default Users;