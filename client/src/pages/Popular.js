import React, { Component } from "react";
import API from "../utils/API";
import { Label, FormGroup, Input, TextArea, FormBtn } from "../components/Form";
import { Col, Row, Container } from "../components/Grid";
import axios from "axios";
import { NavLink } from 'react-router-dom'


// import { isDate } from "util";
const moment = require('moment');

class Popular extends Component {
  state = {
    stories : []
  }

  componentDidMount() {
    this.loadPopular();
  }

  loadPopular = () => {
    API.getPopular()
      .then(
        res => {this.setState({stories: res.data})}
        // res => 
        // this.setState({ stories: res.data})
      )
      .catch(err => console.log(err))
  }

  incrementView = (event) => {
    // event.preventDefault()
    console.log(event.target.id)
    axios.post("/api/view",event.target.id).then(response => {
      console.log(response)
    })
  }
    render() {
      console.log(this.state.stories)
    return(
      <Container fluid>
      <Row>
        <Col size="md-12">
        {this.state.stories.map(story => (
        <div className="story-wrapper card mb-3">
          <div id="story-container">
          <div className="profile-pic-feed d-flex align-items-center justify-content-center" style={{backgroundColor: story.color}}><i className={story.icon}></i></div>
          <NavLink to={"/story/" + story._id}><h1 id={story._id} onClick={this.incrementView}>{story.title}</h1></NavLink>          <p className="author-attr">created {moment(story.date).fromNow()} by <NavLink to={"/" + story.author}>{story.author}</NavLink></p>
          <p className="story-summary">{story.content.slice(0,260) + "..."}</p>
          
          
          </div>

        </div>
        ))}
        </Col>
      </Row>
    </Container>
    )
    }
}

export default Popular;