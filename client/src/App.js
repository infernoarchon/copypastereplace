import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Create from "./pages/Create";
import Latest from "./pages/Latest";
import Popular from "./pages/Popular";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Detail from "./pages/Detail";
import Profile from "./pages/Profile";


import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Nav from "./components/Nav"
import NoMatch from "./pages/NoMatch.js";

import axios from 'axios'



class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      username: null,
      color: null,
      icon: null,
      refreshProfile: false
    }

    this.getUser = this.getUser.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.updateUser = this.updateUser.bind(this)
  }

  componentDidMount() {
    this.getUser()
  }

  updateUser (userObject) {
    this.setState(userObject)
  }

  getUser() {
    axios.get('/user/').then(response => {
      console.log('Get user response: ')
      console.log(response.data)
      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session: ')
        this.getPic(response.data.user)
      } else {
        console.log('Get user: no user');
        this.setState({
          loggedIn: false,
          username: null,
        })
      }
    })
  }
  getPic(user) {
    axios.get('/user/icon',user).then(response => {
      this.setState({
        loggedIn: true,
        username: response.data.username,
        icon: response.data.icon,
        color: response.data.color
    })
    })
  }


  render() {
    return (
      <Router>
        <div className="main-wrapper">
        <div className="nav-bg"></div>
      <div className="main-container">
        <Nav updateUser={this.updateUser} loggedIn={this.state.loggedIn} userName ={this.state.username} userIcon = {this.state.icon} userColor = {this.state.color} />
        <div className="spacer"></div>
        <Switch>
            <Route exact path="/" component={Latest} />
            <Route exact path="/latest" component={Latest} />
            <Route exact path="/popular" component={Popular} />
            <Route exact path="/create" render={() => <Create updateUser={this.updateUser} getUser={this.getUser} userName={this.state.username} userIcon = {this.state.icon} userColor={this.state.color} /> } />
            <Route exact path="/signin" render={() => <SignIn updateUser={this.updateUser} />} />
            <Route exact path="/signup" render={() => <SignUp/>} />
            <Route exact path="/story/:id" component={Detail} />
            <Route exact path="/:id" component={Profile} />
            <Route component={NoMatch} />
        </Switch>
  
      </div>
      </div>
      </Router>
  
  
  
    )
  }
}

export default App;
