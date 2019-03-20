import React, { Component } from "react";
import API from "../utils/API";
// import { Label, FormGroup, Input, TextArea, FormBtn } from "../components/Form";
import { Col, Row, Container } from "../components/Grid";
import axios from "axios";

// import { isDate } from "util";
const moment = require('moment');

class Profile extends Component {
  state = {
    stories : [],
    user : []
  }
  constructor(props) {
      super(props);
      this.goBack = this.goBack.bind(this);
  }

  componentDidMount() {
    API.getUserStories(this.props.match.params.id)
      .then(res => this.setState({ stories: res.data }))
      .catch(err => console.log(err));
    API.getUserInfo(this.props.match.params.id)
    .then(res => this.setState({ user: res.data }))
    .catch(err => console.log(err));
  }


    

  goBack() {
      this.props.history.goBack();
  }

    render() {
        console.log(this.props.match.params.id)
        console.log(this.state.stories)
        console.log(this.state.user)
    return(
      <Container fluid>
      <Row>
        <Col size="md-12">
        <div className="story-wrapper card mb-3">
          <div id="story-container">
            
          {/* {this.props.history.action==="PUSH" ? <div className="back-button mb-3" onClick={this.goBack}><a href="#"><i className="fas fa-arrow-left"></i> Go Back</a></div> : null} */}
          
          <div className="profile-pic-profile" style={{backgroundColor: this.state.user.color}}><i className={this.state.user.icon}></i></div>
          <h1 className="profile-name"><strong>{this.state.user.username}</strong></h1>
          <h2 className="profile-subtext">Joined {moment(this.state.user.date).fromNow()}</h2>
          <hr/>
          </div>

        </div>
        </Col>
      </Row>
    </Container>
    )
    }
}

export default Profile;