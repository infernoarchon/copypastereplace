import React, { Component } from "react";
// import API from "../utils/API";
import { Label, FormGroup, Input, TextArea, FormBtn, ColorDropdown, IconItem, IconIcon } from "../components/Form";
import { Col, Row, Container } from "../components/Grid";
import { Redirect } from 'react-router-dom'

// import { isDate } from "util";
import axios from 'axios'


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

      axios.post('/user/', {
        username: this.state.username,
        password: this.state.password,
        color: this.state.color,
        icon: this.state.icon
      })
        .then( response => {
          console.log(response)
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
      this.setState({color: event.target.value}, function() {
        console.log(this.state.color)
      })
    }
    handleIconSelect = (event) => {
      event.preventDefault()
      this.setState({icon: event.target.value}, function() {
        console.log(this.state.icon)
      })
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
            <div className="col-3 p-0"><div className="swatch"><div className="swatch-preview" style={{ backgroundColor: this.state.color}}></div></div></div>
            <div className="col-9 p-0">
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
            <div className="col-3 p-0"><div className="icon-preview"><i style={{backgroundColor: this.state.color}} className={this.state.icon}></i></div></div>
            <div className="col-9 p-0">
            <div className="dropdown">
            <button className="btn btn-secondary-outline dropdown-toggle text-left" type="button" id="dropdownMenu3" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Choose an Icon
            </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenu3">
                  <IconItem value="fas fa-horse-head" onClick={this.handleIconSelect}>
                    <IconIcon className="fas fa-horse-head" />
                  </IconItem>
                  <IconItem value="fas fa-chess-rook" onClick={this.handleIconSelect}>
                    <IconIcon className="fas fa-chess-rook" />
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