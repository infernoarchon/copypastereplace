import React, { Component } from "react";
import API from "../utils/API";
// import { Label, FormGroup, Input, TextArea, FormBtn } from "../components/Form";
import { Col, Row, Container } from "../components/Grid";
// import { isDate } from "util";

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
        <div className="wrapper card">

          <div id="story-container">
          <h1>{story.title}</h1>
          <p>by {story.author}</p>
          
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