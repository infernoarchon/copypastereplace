import React from "react";
import { NavLink } from 'react-router-dom'

function Nav(props) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <NavLink to="/latest" className="navbar-brand">Copy <span className="logo-strike">Paste </span><span className="logo-bold">Replace </span><i class="fas fa-laugh-squint"></i></NavLink>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="w-100 order-1 order-md-0 dual-collapse2">
        <div className="navbar-collapse collapse" id="navbarNavDropdown">
        <ul className="navbar-nav mr-auto">
        <li className="nav-item">
            <NavLink to="/latest" className="nav-link">Latest</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/popular" className="nav-link">Popular</NavLink>
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
