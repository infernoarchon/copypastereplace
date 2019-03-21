import React, { Component } from "react";
import API from "../utils/API";
// import { Label, FormGroup, Input, TextArea, FormBtn } from "../components/Form";
import { Col, Row, Container } from "../components/Grid";
import { NavLink } from 'react-router-dom'
import axios from "axios";

// import { isDate } from "util";
const moment = require('moment');

class Profile extends Component {
  state = {
    stories : [],
    user : [],
    bio : []
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
    API.getUserInfo(this.props.match.params.id)
    .then(res => 
      API.getBio(moment(res.data.date).format("SSS")/2,res.data.username).then(res => this.setState({ bio: res.data.value.joke}))
      )
    .catch(err => console.log(err));
    

    
  }


    

  goBack() {
      this.props.history.goBack();
  }

    render() {


        console.log(this.state.user)
        console.log(moment(this.state.user.date).format("SSS")/2)
        console.log(this.state.bio)

    return(
      <Container fluid>
      <Row>
        <Col size="md-12">
        <div className="story-wrapper card mb-3">
          <div id="story-container">
            
          {/* {this.props.history.action==="PUSH" ? <div className="back-button mb-3" onClick={this.goBack}><a href="#"><i className="fas fa-arrow-left"></i> Go Back</a></div> : null} */}
          <div>
          <div className="profile-pic-profile d-flex align-items-center justify-content-center" style={{backgroundColor: this.state.user.color}}><i className={this.state.user.icon}></i></div>
          <h1 className="profile-name"><strong>{this.state.user.username}</strong></h1>
          <h3 className="profile-eyebrow">moving side to side since {moment(this.state.user.date).format("MMMM YYYY")}<br/><br/></h3>
          </div>
          <h2 className="profile-subtext">
          {this.state.bio}
          </h2>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Summary</th>
                <th scope="col">Date Created</th>
              </tr>
            </thead>
            <tbody>
            {this.state.stories.map(story => (
              <tr>
                <td><NavLink to={"/story/" + story._id}>{story.title.length > 30 ? story.title.slice(0,30) + "..." : story.title}</NavLink></td>
                <td>{story.content.slice(0,90) + "..."}</td>
                <td>{moment(story.date).fromNow()}</td>
              </tr>
            ))}
            </tbody>
          </table>


          </div>

        </div>
        </Col>
      </Row>
    </Container>
    )
    }
}

export default Profile;