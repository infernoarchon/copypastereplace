import React, { Component } from "react";
// import API from "../utils/API";
import { Label, FormGroup, Input, TextArea, FormBtn, ColorDropdown, IconItem, IconIcon } from "../components/Form";
import { Col, Row, Container } from "../components/Grid";
import { Redirect } from 'react-router-dom'

// import { isDate } from "util";
import axios from 'axios'
import { maxHeaderSize } from "http";


class SignUp extends Component {
    constructor() {
      super()
      this.state = {
        username: '',
        password: '',
        color: '',
        icon: '',
        confirmPassword: '',
        redirectTo: null
      }
      this.handleSubmit = this.handleSubmit.bind(this)
      this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
      this.setState({
        [event.target.name]: event.target.value
      })
    }

    handleSubmit(event) {
      console.log(this.state.username)
      console.log(this.state.password)
      event.preventDefault()
      let iconRand = this.state.icon
      let colorRand = this.state.color
      const icons = [
        "fas fa-flushed",
        "fas fa-frown-open",
        "fas fa-grimace",
        "fas fa-grin",
        "fas fa-grin-alt",
        "fas fa-grin-beam",
        "fas fa-grin-beam-sweat",
        "fas fa-grin-hearts",
        "fas fa-grin-squint",
        "fas fa-grin-squint",
        "fas fa-grin-squint-tears",
        "fas fa-grin-stars",
        "fas fa-grin-tears",
        "fas fa-grin-tongue",
        "fas fa-grin-tongue-squint",
        "fas fa-grin-tongue-wink",
        "fas fa-grin-wink",
        "fas fa-kiss",
        "fas fa-kiss-beam",
        "fas fa-kiss-wink-heart",
        "fas fa-laugh",
        "fas fa-laugh-beam",
        "fas fa-laugh-squint",
        "fas fa-laugh-wink",
        "fas fa-meh",
        "fas fa-meh-blank",
        "fas fa-meh-rolling-eyes",
        "fas fa-sad-cry",
        "fas fa-smile",
        "fas fa-smile-beam",
        "fas fa-smile-wink",
        "fas fa-surprise",
        "fas fa-user-astronaut",
        "fas fa-user-ninja",
        "fas fa-user-secret",
        "fas fa-user-tie",
        "fas fa-cat",
        "fas fa-crow",
        "fas fa-dog",
        "fas fa-dove",
        "fas fa-dragon",
        "fas fa-fish",
        "fas fa-frog",
        "fas fa-hippo",
        "fas fa-horse",
        "fas fa-horse-head",
        "fas fa-kiwi-bird",
        "fas fa-otter",
        "fas fa-spider",
        "fas fa-bug",
        "fas fa-chess-rook",
        "fas fa-chess-queen",
        "fas fa-chess-pawn",
        "fas fa-chess-knight",
        "fas fa-chess-king",
        "fas fa-chess-bishop",
        "fas fa-snowman",
        "fas fa-ghost",
        "fas fa-poo",
        "fas fa-skull",
        "fas fa-robot",
        "fas fa-pastafarianism",
        "fas fa-car-side",
        "fas fa-motorcycle",
        "fas fa-hamburger",
        "fas fa-carrot",
        "fas fa-pizza-slice",
        "fas fa-pepper-hot",
        "fas fa-football-ball",
        "fas fa-futbol",
        "fas fa-basketball-ball",
        "fas fa-baseball-ball",
        "fas fa-volleyball-ball",
        "fas fa-snowboarding",
        "fas fa-toilet-paper",
        "fas fa-paper-plane",
        "fas fa-tree",
        "fas fa-air-freshener",
        "fas fa-umbrella",
        "fas fa-bomb",
        "fas fa-atom",
        "fas fa-brain",
        "fas fa-meteor",
        "fas fa-yin-yang",
        "fas fa-haykal",
        "fas fa-dice-d20",
        "fas fa-hand-spock",
      ]
      const colors = [
        '#ff4436',
        '#9c27b0',
        '#3f51b5',
        '#2196f3',
        '#009688',
        '#8bc34a',
        '#d8bf00',
        '#ff9800',
      ]
      if(this.state.icon.length === 0 || this.state.color.length === 0) {
        iconRand = icons[Math.floor(Math.random() * icons.length)]
        colorRand = colors[Math.floor(Math.random() * colors.length)]
        // console.log(iconRand)
        // console.log(colorRand)
      }
      axios.post('/user/', {
        username: this.state.username,
        password: this.state.password,
        color: colorRand,
        icon: iconRand
      })
        .then( response => {
          // console.log(response)
          if(!response.data.error) {
            console.log('succesful signup')
            this.setState({
              redirectTo: '/signin'
            })
          } else {
            console.log('username already taken')
          }
          }).catch(error => {
            console.log(error)
          })
      }
    handleColorSelect = (event) => {
      event.preventDefault()
      this.setState({color: event.target.value})
    }
    handleIconSelect = (event) => {
      event.preventDefault()
      this.setState({icon: event.target.value})
    }
    

    render() {
      if (this.state.redirectTo) {
        return <Redirect to={{ pathname: this.state.redirectTo }} />
    } else{
    return(
      <Container fluid>
      <Row>
        <Col size="md-12">

        <div className="wrapper card">
        <div id="story-container">
        <h5 className="pt-2"><strong>Create an account</strong></h5>
        <form className="mt-4">
          <Label htmlFor="username">Username</Label>
          <Input name="username" type="text" value={this.state.username} onChange={this.handleChange} />
          <Label className="mt-3" htmlFor="password">Password</Label>
          <Input name="password" type="password" value={this.state.password} onChange={this.handleChange} />
          <Label className="mt-3" htmlFor="colorDropdown">Your Favorite Color</Label>
          <div className="row w-25 p-0">
            <div className="col-2 p-0"><div className="swatch"><div className="swatch-preview" style={{ backgroundColor: this.state.color}}></div></div></div>
            <div className="col-10 p-0">
            <div className="dropdown">
              <button className="btn btn-secondary-outline dropdown-toggle text-left" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Choose a Color
              </button>
                  <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                    <button className="dropdown-item color-drop" style={{backgroundColor: '#ff4436'}} onClick={this.handleColorSelect} value="#f44336" type="button"></button>
                    <button className="dropdown-item color-drop" style={{backgroundColor: '#9c27b0'}} onClick={this.handleColorSelect} value="#9c27b0" type="button"></button>
                    <button className="dropdown-item color-drop" style={{backgroundColor: '#3f51b5'}} onClick={this.handleColorSelect} value="#3f51b5" type="button"></button>
                    <button className="dropdown-item color-drop" style={{backgroundColor: '#2196f3'}} onClick={this.handleColorSelect} value="#2196f3" type="button"></button>
                    <button className="dropdown-item color-drop" style={{backgroundColor: '#009688'}} onClick={this.handleColorSelect} value="#009688" type="button"></button>
                    <button className="dropdown-item color-drop" style={{backgroundColor: '#8bc34a'}} onClick={this.handleColorSelect} value="#8bc34a" type="button"></button>
                    <button className="dropdown-item color-drop" style={{backgroundColor: '#d8bf00'}} onClick={this.handleColorSelect} value="#d8bf00" type="button"></button>
                    <button className="dropdown-item color-drop" style={{backgroundColor: '#ff9800'}} onClick={this.handleColorSelect} value="#ff9800" type="button"></button>



                  </div>
                </div>

            </div>
          </div>
          <Label className="mt-3" htmlFor="iconDropdown">Your Profile Pic</Label>
          <div className="row w-25 p-0">
            <div className="col-2 p-0"><div className="icon-preview"><i style={{backgroundColor: this.state.color}} className={this.state.icon}></i></div></div>
            <div className="col-10 p-0">
            <div className="dropdown">
            <button className="btn btn-secondary-outline dropdown-toggle text-left" type="button" id="dropdownMenu3" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Choose an Icon
            </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenu3">
                  <IconItem value="fas fa-flushed" onClick={this.handleIconSelect}>
                    <IconIcon className="fas fa-flushed" />
                  </IconItem>
                  <IconItem value="fas fa-frown-open" onClick={this.handleIconSelect}>
                    <IconIcon className="fas fa-frown-open" />
                  </IconItem>
                  <IconItem value="fas fa-grimace" onClick={this.handleIconSelect}>
                    <IconIcon className="fas fa-grimace" />
                  </IconItem>
                  <IconItem value="fas fa-grin" onClick={this.handleIconSelect}>
                    <IconIcon className="fas fa-grin" />
                  </IconItem>
                  <IconItem value="fas fa-grin-alt" onClick={this.handleIconSelect}>
                    <IconIcon className="fas fa-grin-alt" />
                  </IconItem>
                  <IconItem value="fas fa-grin-beam" onClick={this.handleIconSelect}>
                    <IconIcon className="fas fa-grin-beam" />
                  </IconItem>
                  <IconItem value="fas fa-grin-beam-sweat" onClick={this.handleIconSelect}>
                    <IconIcon className="fas fa-grin-beam-sweat" />
                  </IconItem>
                  <IconItem value="fas fa-grin-hearts" onClick={this.handleIconSelect}>
                    <IconIcon className="fas fa-grin-hearts" />
                  </IconItem>
                  <IconItem value="fas fa-grin-squint" onClick={this.handleIconSelect}>
                    <IconIcon className="fas fa-grin-squint" />
                  </IconItem>
                  <IconItem value="fas fa-grin-squint" onClick={this.handleIconSelect}>
                    <IconIcon className="fas fa-grin-squint" />
                  </IconItem>
                  <IconItem value="fas fa-grin-squint-tears" onClick={this.handleIconSelect}>
                    <IconIcon className="fas fa-grin-squint-tears" />
                  </IconItem>
                  <IconItem value="fas fa-grin-stars" onClick={this.handleIconSelect}>
                    <IconIcon className="fas fa-grin-stars" />
                  </IconItem>
                  <IconItem value="fas fa-grin-tears" onClick={this.handleIconSelect}>
                    <IconIcon className="fas fa-grin-tears" />
                  </IconItem>
                  <IconItem value="fas fa-grin-tongue" onClick={this.handleIconSelect}>
                    <IconIcon className="fas fa-grin-tongue" />
                  </IconItem>
                  <IconItem value="fas fa-grin-tongue-squint" onClick={this.handleIconSelect}>
                    <IconIcon className="fas fa-grin-tongue-squint" />
                  </IconItem>
                  <IconItem value="fas fa-grin-tongue-wink" onClick={this.handleIconSelect}>
                    <IconIcon className="fas fa-grin-tongue-wink" />
                  </IconItem>
                  <IconItem value="fas fa-grin-wink" onClick={this.handleIconSelect}>
                    <IconIcon className="fas fa-grin-wink" />
                  </IconItem>
                  <IconItem value="fas fa-kiss" onClick={this.handleIconSelect}>
                    <IconIcon className="fas fa-kiss" />
                  </IconItem>
                  <IconItem value="fas fa-kiss-beam" onClick={this.handleIconSelect}>
                    <IconIcon className="fas fa-kiss-beam" />
                  </IconItem>
                  <IconItem value="fas fa-kiss-wink-heart" onClick={this.handleIconSelect}>
                    <IconIcon className="fas fa-kiss-wink-heart" />
                  </IconItem>
                  <IconItem value="fas fa-laugh" onClick={this.handleIconSelect}>
                    <IconIcon className="fas fa-laugh" />
                  </IconItem>
                  <IconItem value="fas fa-laugh-beam" onClick={this.handleIconSelect}>
                    <IconIcon className="fas fa-laugh-beam" />
                  </IconItem>
                  <IconItem value="fas fa-laugh-squint" onClick={this.handleIconSelect}>
                    <IconIcon className="fas fa-laugh-squint" />
                  </IconItem>
                  <IconItem value="fas fa-laugh-wink" onClick={this.handleIconSelect}>
                    <IconIcon className="fas fa-laugh-wink" />
                  </IconItem>
                  <IconItem value="fas fa-meh" onClick={this.handleIconSelect}>
                    <IconIcon className="fas fa-meh" />
                  </IconItem>
                  <IconItem value="fas fa-meh-blank" onClick={this.handleIconSelect}>
                    <IconIcon className="fas fa-meh-blank" />
                  </IconItem>
                  <IconItem value="fas fa-meh-rolling-eyes" onClick={this.handleIconSelect}>
                    <IconIcon className="fas fa-meh-rolling-eyes" />
                  </IconItem>
                  <IconItem value="fas fa-sad-cry" onClick={this.handleIconSelect}>
                    <IconIcon className="fas fa-sad-cry" />
                  </IconItem>
                  <IconItem value="fas fa-smile" onClick={this.handleIconSelect}>
                    <IconIcon className="fas fa-smile" />
                  </IconItem>
                  <IconItem value="fas fa-smile-beam" onClick={this.handleIconSelect}>
                    <IconIcon className="fas fa-smile-beam" />
                  </IconItem>
                  <IconItem value="fas fa-smile-wink" onClick={this.handleIconSelect}>
                    <IconIcon className="fas fa-smile-wink" />
                  </IconItem>
                  <IconItem value="fas fa-surprise" onClick={this.handleIconSelect}>
                    <IconIcon className="fas fa-surprise" />
                  </IconItem>
                  <IconItem value="fas fa-user-astronaut" onClick={this.handleIconSelect}>
                    <IconIcon className="fas fa-user-astronaut" />
                  </IconItem>
                  <IconItem value="fas fa-user-ninja" onClick={this.handleIconSelect}>
                    <IconIcon className="fas fa-user-ninja" />
                  </IconItem>
                  <IconItem value="fas fa-user-secret" onClick={this.handleIconSelect}>
                    <IconIcon className="fas fa-user-secret" />
                  </IconItem>
                  <IconItem value="fas fa-user-tie" onClick={this.handleIconSelect}>
                    <IconIcon className="fas fa-user-tie" />
                  </IconItem>
                  <IconItem value="fas fa-cat" onClick={this.handleIconSelect}>
                    <IconIcon className="fas fa-cat" />
                  </IconItem>
                  <IconItem value="fas fa-crow" onClick={this.handleIconSelect}>
                    <IconIcon className="fas fa-crow" />
                  </IconItem>
                  <IconItem value="fas fa-dog" onClick={this.handleIconSelect}>
                    <IconIcon className="fas fa-dog" />
                  </IconItem>
                  <IconItem value="fas fa-dove" onClick={this.handleIconSelect}>
                    <IconIcon className="fas fa-dove" />
                  </IconItem>
                  <IconItem value="fas fa-dragon" onClick={this.handleIconSelect}>
                    <IconIcon className="fas fa-dragon" />
                  </IconItem>
                  <IconItem value="fas fa-fish" onClick={this.handleIconSelect}>
                    <IconIcon className="fas fa-fish" />
                  </IconItem>
                  <IconItem value="fas fa-frog" onClick={this.handleIconSelect}>
                    <IconIcon className="fas fa-frog" />
                  </IconItem>
                  <IconItem value="fas fa-hippo" onClick={this.handleIconSelect}>
                    <IconIcon className="fas fa-hippo" />
                  </IconItem>
                  <IconItem value="fas fa-horse" onClick={this.handleIconSelect}>
                    <IconIcon className="fas fa-horse" />
                  </IconItem>
                  <IconItem value="fas fa-horse-head" onClick={this.handleIconSelect}>
                    <IconIcon className="fas fa-horse-head" />
                  </IconItem>
                  <IconItem value="fas fa-kiwi-bird" onClick={this.handleIconSelect}>
                    <IconIcon className="fas fa-kiwi-bird" />
                  </IconItem>
                  <IconItem value="fas fa-otter" onClick={this.handleIconSelect}>
                    <IconIcon className="fas fa-otter" />
                  </IconItem>
                  <IconItem value="fas fa-spider" onClick={this.handleIconSelect}>
                    <IconIcon className="fas fa-spider" />
                  </IconItem>
                  <IconItem value="fas fa-bug" onClick={this.handleIconSelect}>
                    <IconIcon className="fas fa-bug" />
                  </IconItem>
                  <IconItem value="fas fa-chess-rook" onClick={this.handleIconSelect}>
                    <IconIcon className="fas fa-chess-rook" />
                  </IconItem>
                  <IconItem value="fas fa-chess-queen" onClick={this.handleIconSelect}>
                    <IconIcon className="fas fa-chess-queen" />
                  </IconItem>
                  <IconItem value="fas fa-chess-pawn" onClick={this.handleIconSelect}>
                    <IconIcon className="fas fa-chess-pawn" />
                  </IconItem>
                  <IconItem value="fas fa-chess-knight" onClick={this.handleIconSelect}>
                    <IconIcon className="fas fa-chess-knight" />
                  </IconItem>
                  <IconItem value="fas fa-chess-king" onClick={this.handleIconSelect}>
                    <IconIcon className="fas fa-chess-king" />
                  </IconItem>
                  <IconItem value="fas fa-chess-bishop" onClick={this.handleIconSelect}>
                    <IconIcon className="fas fa-chess-bishop" />
                  </IconItem>
                  <IconItem value="fas fa-snowman" onClick={this.handleIconSelect}>
                    <IconIcon className="fas fa-snowman" />
                  </IconItem>
                  <IconItem value="fas fa-ghost" onClick={this.handleIconSelect}>
                    <IconIcon className="fas fa-ghost" />
                  </IconItem>
                  <IconItem value="fas fa-poo" onClick={this.handleIconSelect}>
                    <IconIcon className="fas fa-poo" />
                  </IconItem>
                  <IconItem value="fas fa-skull" onClick={this.handleIconSelect}>
                    <IconIcon className="fas fa-skull" />
                  </IconItem>
                  <IconItem value="fas fa-robot" onClick={this.handleIconSelect}>
                    <IconIcon className="fas fa-robot" />
                  </IconItem>
                  <IconItem value="fas fa-pastafarianism" onClick={this.handleIconSelect}>
                    <IconIcon className="fas fa-pastafarianism" />
                  </IconItem>
                  <IconItem value="fas fa-car-side" onClick={this.handleIconSelect}>
                    <IconIcon className="fas fa-car-side" />
                  </IconItem>
                  <IconItem value="fas fa-motorcycle" onClick={this.handleIconSelect}>
                    <IconIcon className="fas fa-motorcycle" />
                  </IconItem>
                  <IconItem value="fas fa-hamburger" onClick={this.handleIconSelect}>
                    <IconIcon className="fas fa-hamburger" />
                  </IconItem>
                  <IconItem value="fas fa-carrot" onClick={this.handleIconSelect}>
                    <IconIcon className="fas fa-carrot" />
                  </IconItem>
                  <IconItem value="fas fa-pizza-slice" onClick={this.handleIconSelect}>
                    <IconIcon className="fas fa-pizza-slice" />
                  </IconItem>
                  <IconItem value="fas fa-pepper-hot" onClick={this.handleIconSelect}>
                    <IconIcon className="fas fa-pepper-hot" />
                  </IconItem>
                  <IconItem value="fas fa-football-ball" onClick={this.handleIconSelect}>
                    <IconIcon className="fas fa-football-ball" />
                  </IconItem>
                  <IconItem value="fas fa-futbol" onClick={this.handleIconSelect}>
                    <IconIcon className="fas fa-futbol" />
                  </IconItem>
                  <IconItem value="fas fa-basketball-ball" onClick={this.handleIconSelect}>
                    <IconIcon className="fas fa-basketball-ball" />
                  </IconItem>
                  <IconItem value="fas fa-baseball-ball" onClick={this.handleIconSelect}>
                    <IconIcon className="fas fa-baseball-ball" />
                  </IconItem>
                  <IconItem value="fas fa-volleyball-ball" onClick={this.handleIconSelect}>
                    <IconIcon className="fas fa-volleyball-ball" />
                  </IconItem>
                  <IconItem value="fas fa-snowboarding" onClick={this.handleIconSelect}>
                    <IconIcon className="fas fa-snowboarding" />
                  </IconItem>
                  <IconItem value="fas fa-toilet-paper" onClick={this.handleIconSelect}>
                    <IconIcon className="fas fa-toilet-paper" />
                  </IconItem>
                  <IconItem value="fas fa-paper-plane" onClick={this.handleIconSelect}>
                    <IconIcon className="fas fa-paper-plane" />
                  </IconItem>
                  <IconItem value="fas fa-tree" onClick={this.handleIconSelect}>
                    <IconIcon className="fas fa-tree" />
                  </IconItem>
                  <IconItem value="fas fa-air-freshener" onClick={this.handleIconSelect}>
                    <IconIcon className="fas fa-air-freshener" />
                  </IconItem>
                  <IconItem value="fas fa-umbrella" onClick={this.handleIconSelect}>
                    <IconIcon className="fas fa-umbrella" />
                  </IconItem>
                  <IconItem value="fas fa-bomb" onClick={this.handleIconSelect}>
                    <IconIcon className="fas fa-bomb" />
                  </IconItem>
                  <IconItem value="fas fa-atom" onClick={this.handleIconSelect}>
                    <IconIcon className="fas fa-atom" />
                  </IconItem>
                  <IconItem value="fas fa-brain" onClick={this.handleIconSelect}>
                    <IconIcon className="fas fa-brain" />
                  </IconItem>
                  <IconItem value="fas fa-meteor" onClick={this.handleIconSelect}>
                    <IconIcon className="fas fa-meteor" />
                  </IconItem>
                  <IconItem value="fas fa-yin-yang" onClick={this.handleIconSelect}>
                    <IconIcon className="fas fa-yin-yang" />
                  </IconItem>
                  <IconItem value="fas fa-haykal" onClick={this.handleIconSelect}>
                    <IconIcon className="fas fa-haykal" />
                  </IconItem>
                  <IconItem value="fas fa-dice-d20" onClick={this.handleIconSelect}>
                    <IconIcon className="fas fa-dice-d20" />
                  </IconItem>
                  <IconItem value="fas fa-hand-spock" onClick={this.handleIconSelect}>
                    <IconIcon className="fas fa-hand-spock" />
                  </IconItem>
                  


                </div>
            </div>
            </div>
          </div>
					<button
						className="btn btn-primary mt-3"
						onClick={this.handleSubmit}
						type="submit"
					>Sign Up</button>
				</form>


        </div>
        </div>
        </Col>
      </Row>
    </Container>
    )
    }
  }
}

export default SignUp;