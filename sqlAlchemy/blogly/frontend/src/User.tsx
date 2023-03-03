//dependencies 
import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
//components 
import { IUser } from './interface'
import { getUser } from './api'
// style
import './style/User.css'
import img from './default.png'

const defaultUser = { id: 0, firstName: '', lastName: '', image: '' }

/** Displays user information
 * 
 * State:
 * - user: {id: number, firstName: string, lastName: string}
 */
function User() {
  const [user, setUser] = useState<IUser>(defaultUser)

  const params = useParams();

  /** fetches user with matching ID from database */
  useEffect(() => {
    async function fetchUser(id: number | undefined) {
      const res = await getUser(id)
      setUser(res)
    }
    fetchUser(+params.id!)
  }, [])
  return (
    <div className="User-container">
      <img src={img} alt={`${user.firstName || 'default profile picture'} profile picture`} height="400px" width="400px"></img>
      <div className="User-user">
        <div className="User-fn">{user.firstName}</div>
        <div className="User-ln">{user.lastName}</div>
      </div>
      <Button>Add</Button>
      <Button>Delete</Button>
    </div>
  )
}

export default User