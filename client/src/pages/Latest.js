import React, { Component } from "react";
import API from "../utils/API";
// import { Label, FormGroup, Input, TextArea, FormBtn } from "../components/Form";
import { Col, Row, Container } from "../components/Grid";
// import { isDate } from "util";
const moment = require('moment');

class Latest extends Component {
  state = {
    stories : []
  }

  componentDidMount() {
    this.loadStories();
  }

  loadStories = () => {
    API.getStories()
      .then(
        res => {this.setState({stories: res.data})}
        // res => 
        // this.setState({ stories: res.data})
      )
      .catch(err => console.log(err))
  }
    render() {
    return(
      <Container fluid>
      <Row>
        <Col size="md-12">
        {this.state.stories.map(story => (
        <div className="story-wrapper card mb-3">

          <div id="story-container">
          <p class="author-attr">created {moment(story.date).fromNow()} by {story.author}</p>
          <h1>{story.title}</h1>
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

export default Latest;