import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { UserContext } from "./userContext";


type NavBarProp = {
  logout: () => Promise<void>;
}

function Navigation({ logout }: NavBarProp) {
const { user } = useContext(UserContext)

  function loggedInNav() {
    return (
      <ul className="navbar-nav ms-auto">
        <li className="nav-item me-4">
          <NavLink className="nav-link" to={`projects/${user?.id}`}>
            Projects
          </NavLink>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/" onClick={logout}>
            Log out {user?.firstName || user?.email}
          </Link>
        </li>
      </ul>
    );
  }

  function loggedOutNav() {
    return (
      <ul className="navbar-nav ms-auto">
        <li className="nav-item me-4">
          <NavLink className="nav-link" to="/login">
            Login
          </NavLink>
        </li>
        <li className="nav-item me-4">
          <NavLink className="nav-link" to="/signup">
            Sign Up
          </NavLink>
        </li>
      </ul>
    );
  }
  return (
    <nav className="Navigation navbar navbar-expand-md">
      <div className="container-fluid">
        <Link className="navbar-brand" to={user ? "/users" : "/login"}>
          Bugly
        </Link>
        {user ? loggedInNav() : loggedOutNav()}
      </div>
    </nav>
  )
}

export default Navigation;