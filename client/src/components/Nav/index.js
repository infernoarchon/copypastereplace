import React, { Component } from "react";
import { Redirect } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

import axios from 'axios'


class Nav extends Component {
  constructor() {
    super()
    this.logout = this.logout.bind(this)
}

logout(event) {
    event.preventDefault()
    console.log('logging out')
    axios.post('/user/logout').then(response => {
      console.log(response.data)
      if (response.status === 200) {
        this.props.updateUser({
          loggedIn: false,
          username: null
        })
      }
    }).catch(error => {
        console.log('Logout error')
    })
  }

  render() {
    const loggedIn = this.props.loggedIn;
    console.log('navbar render, props: ')
    console.log(this.props);

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
            {loggedIn 
            ? <div>
                        <a className="nav-link dropdown-toggle" id="userDropdownLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {this.props.userName}
                        </a>
                        <div className="dropdown-menu user-dropdown" aria-labelledby="navbarDropdownMenuLink">
                        <NavLink to="#" className="dropdown-item" onClick={this.logout}>Log Out</NavLink>
                        </div>
              </div>
            : 
            <ul className="navbar-nav mr-auto">
            <li className="nav-item">
            <NavLink to="/signin" className="nav-link">Sign In</NavLink>
              </li>
              <li className="nav-item">
              <NavLink to="/signup" className="nav-link nav-link-box">Sign Up</NavLink>
              </li>
            </ul>

            }
            </div>
        </div>
    </nav>
  );
  }
}

export default Nav;
