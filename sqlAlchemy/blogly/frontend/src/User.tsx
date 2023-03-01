import React from "react";
import { IUser } from './interface'

function User({ firstName, lastName, image }: IUser) {
  return (
    <div className="User-user">
      <div className="User-fn">{firstName}</div>
      <div className="User-ln">{lastName}</div>
      <div className="User-img">{image}</div>
    </div>
  )
}

export default User