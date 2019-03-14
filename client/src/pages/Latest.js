import React, { Component } from "react";
// import API from "../utils/API";
// import { Label, FormGroup, Input, TextArea, FormBtn } from "../components/Form";
import { Col, Row, Container } from "../components/Grid";
// import { isDate } from "util";

class Latest extends Component {
  
    render() {
    return(
      <Container fluid>
      <Row>
        <Col size="md-12">

        <div className="wrapper card">
        <div id="story-container">All the new stories go here</div>
        </div>
        </Col>
      </Row>
    </Container>
    )
    }
}

export default Latest;