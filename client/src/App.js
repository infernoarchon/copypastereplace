import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Create from "./pages/Create";
import Latest from "./pages/Latest";
import Popular from "./pages/Popular";

import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Nav from "./components/Nav"
import NoMatch from "./pages/NoMatch.js";


class App extends Component {
  render() {
    return (
      <Router>
        
      <div className="main-container">
        <Nav/>
        <Switch>
            <Route exact path="/" component={Latest} />
            <Route exact path="/latest" component={Latest} />
            <Route exact path="/popular" component={Popular} />
            <Route exact path="/create" component={Create} />
            <Route component={NoMatch} />
        </Switch>
  
      </div>
      </Router>
  
  
  
    )
  }
}

export default App;
