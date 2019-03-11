import React from "react";
import { NavLink } from 'react-router-dom'

function Nav(props) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-3">
      <NavLink to="/new" className="navbar-brand">Copy<span className="logo-strike"> Paste</span> <span className="logo-bold">Replace</span></NavLink>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarColor02">
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
    </nav>
  );
}

export default Nav;
