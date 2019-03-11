import React from "react";
import { NavLink } from 'react-router-dom'

function Nav(props) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-3">
      <NavLink to="/new" className="navbar-brand">Copy<span className="logo-strike"> Paste</span> <span className="logo-bold">Replace</span></NavLink>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="w-100 order-1 order-md-0 dual-collapse2">
        <div className="navbar-collapse collapse" id="navbarNavDropdown">
        <ul className="navbar-nav mr-auto">
        <li className="nav-item">
            <NavLink to="/new" className="nav-link">New</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/top" className="nav-link">Top</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/create" className="nav-link">Create</NavLink>
          </li>
        </ul>
        </div>
      
      </div>
      <div className="w-100 nav-item dropdown navbar-collapse collapse order-2 dual-collapse2">
            <div className="navbar-nav ml-auto">
            <a className="nav-link dropdown-toggle" id="userDropdownLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Login
            </a>
            <div className="dropdown-menu user-dropdown" aria-labelledby="navbarDropdownMenuLink">
            <a className="dropdown-item">Log Out</a>
            </div>
            </div>
        </div>
    </nav>
  );
}

export default Nav;
