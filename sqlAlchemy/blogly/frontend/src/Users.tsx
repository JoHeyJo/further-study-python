import React, { useState, useEffect } from "react";
import { IUser } from './interface'
import { getUsers, getUser } from "./api";

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
  //   const res = await getUsers();
  //   setUsers(res)
  // }

  useEffect(()=>{
    async function fetchUsers() {
      const res = await getUsers();
      setUsers(res)
    }
    fetchUsers();
  },[])


  async function fetchUser(id: number){
    await getUser(id);
  }

  return (
    <>
    <div>
      {users.map(u => <div key={u.id}> {u.firstName} {u.lastName}</div>)}

    </div>
      <div>Get User</div>
      <input></input>
    
    </>
  )
}

export default Users;