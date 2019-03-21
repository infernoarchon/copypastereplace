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
      this.getTagline = this.getTagline.bind(this);
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
      API.getBio(Math.floor(moment(res.data.date).format("SSS")/2),res.data.username).then(res => {document.getElementById("profile-bio").innerHTML = res.data.value.joke}))
    .catch(err => console.log(err));

    API.getUserInfo(this.props.match.params.id)
    .then(res => {this.getTagline(res.data.icon)})
    .catch(err => console.log(err));
  }



    

  goBack() {
      this.props.history.goBack();
  }

  getTagline(icon) {
    console.log(icon)
    let tagline = {
      "fas fa-flushed" : "flushed",
      "fas fa-frown-open" : "surprised",
      "fas fa-grimace" : "unperturbed",
      "fas fa-grin" : "happy",
      "fas fa-grin-alt" : "happy",
      "fas fa-grin-beam" : "happy",
      "fas fa-grin-beam-sweat" : "watching anime",
      "fas fa-grin-hearts" : "in love",
      "fas fa-grin-squint" : "laughing",
      "fas fa-grin-squint-tears" : "rofl",
      "fas fa-grin-stars" : "starstruck",
      "fas fa-grin-tears" : "crying",
      "fas fa-grin-tongue" : "teasing",
      "fas fa-grin-tongue-squint" : "teasing",
      "fas fa-grin-tongue-wink" : "teasing",
      "fas fa-grin-wink" : "flirting",
      "fas fa-kiss" : "kissing",
      "fas fa-kiss-beam" : "kissing",
      "fas fa-kiss-wink-heart" : "kissing",
      "fas fa-laugh" : "laughing",
      "fas fa-laugh-beam" : "laughing",
      "fas fa-laugh-squint" : "laughing",
      "fas fa-laugh-wink" : "flirting",
      "fas fa-meh" : "bored",
      "fas fa-meh-blank" : "bored",
      "fas fa-meh-rolling-eyes" : "bored",
      "fas fa-sad-cry" : "crying",
      "fas fa-smile" : "smiling",
      "fas fa-smile-beam" : "smiling",
      "fas fa-smile-wink" : "flirting",
      "fas fa-surprise" : "startled",
      "fas fa-user-astronaut" : "blasting off",
      "fas fa-user-ninja" : "chopping onions",
      "fas fa-user-secret" : "undercover",
      "fas fa-user-tie" : "business casual",
      "fas fa-cat" : "pushing things off the table",
      "fas fa-crow" : "saying nevermore",
      "fas fa-dog" : "such wow",
      "fas fa-dove" : "winging it",
      "fas fa-dragon" : "kidnapping princesses",
      "fas fa-fish" : "swimming",
      "fas fa-frog" : "announcing wednesdays",
      "fas fa-hippo" : "hungry",
      "fas fa-horse" : "dressaging",
      "fas fa-horse-head" : "forgetting about it",
      "fas fa-kiwi-bird" : "almost extinct",
      "fas fa-otter" : "balling",
      "fas fa-spider" : "biting teenagers",
      "fas fa-bug" : "debugging",
      "fas fa-chess-rook" : "moving side to side",
      "fas fa-chess-queen" : "protecting the useless husband",
      "fas fa-chess-pawn" : "moving forward",
      "fas fa-chess-knight" : "jumping around",
      "fas fa-chess-king" : "castling",
      "fas fa-chess-bishop" : "moving diagonally",
      "fas fa-snowman" : "all I want for Christmas",
      "fas fa-ghost" : "chasing Pac-man",
      "fas fa-poo" : "an emoji",
      "fas fa-skull" : "spooky",
      "fas fa-robot" : "mark zuckerberg",
      "fas fa-pastafarianism" : "worshipped",
      "fas fa-car-side" : "road tripping",
      "fas fa-motorcycle" : "moving the soul",
      "fas fa-hamburger" : "loving it",
      "fas fa-carrot" : "hopping",
      "fas fa-pizza-slice" : "burning the roof of your mouth",
      "fas fa-pepper-hot" : "spicing it up",
      "fas fa-football-ball" : "kneeling",
      "fas fa-futbol" : "falling",
      "fas fa-basketball-ball" : "balling",
      "fas fa-baseball-ball" : "boring",
      "fas fa-volleyball-ball" : "setting",
      "fas fa-snowboarding" : "shredding",
      "fas fa-toilet-paper" : "running out",
      "fas fa-paper-plane" : "flying",
      "fas fa-tree" : "oxygenating",
      "fas fa-air-freshener" : "keeping cars fresh",
      "fas fa-umbrella" : "dry",
      "fas fa-bomb" : "ticking",
      "fas fa-atom" : "composing life",
      "fas fa-brain" : "thinking",
      "fas fa-meteor" : "owning dinosaurs",
      "fas fa-yin-yang" : "balanced",
      "fas fa-dice-d20" : "rolling d20s",
      "fas fa-hand-spock" : "prospering"
    }
    let tag = tagline[icon]
    document.getElementById("tagline").innerHTML = tag
  }

    render() {



        console.log(moment(this.state.user.date).format("SSS"))

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
          <h3 className="profile-eyebrow"><span id="tagline"></span> since {moment(this.state.user.date).format("MMMM YYYY")}</h3>
          </div>
          <h2 id="profile-bio" className="profile-subtext">
          </h2>
          {this.state.stories.length > 0 ? 
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Summary</th>
                <th scope="col">Created</th>
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
            : null
            }


          </div>

        </div>
        </Col>
      </Row>
    </Container>
    )
    }
}

export default Profile;