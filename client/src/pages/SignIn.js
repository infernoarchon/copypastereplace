import React, { Component } from "react";
// import API from "../utils/API";
import { Label, FormGroup, Input, TextArea, FormBtn } from "../components/Form";
import { Redirect } from 'react-router-dom'
import { Col, Row, Container } from "../components/Grid";
// import { isDate } from "util";
import axios from 'axios'


class SignIn extends Component {
    constructor() {
      super()
      this.state = {
        username: '',
        password: '',
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
        event.preventDefault()
        // console.log('handleSubmit')

        axios
            .post('/user/login', {
                username: this.state.username,
                password: this.state.password
            })
            .then(response => {
                console.log('login response: ')
                // console.log(response)
                if (response.status === 200) {
                  this.getPic(response.data.username)
                    // update App.js state
                    // update the state to redirect to home
                    this.setState({
                        redirectTo: '/'
                    })
                }
            }).catch(error => {
                console.log('login error: ')
                console.log(error);
                
            })
    }
    getPic(user) {
      axios.get('/user/icon',user).then(response => {
        this.props.updateUser({
          loggedIn: true,
          username: user,
          icon: response.data.icon,
          color: response.data.color
      })
        // console.log(this.state.color, this.state.icon)
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
        <h5 className="pt-2"><strong>Sign In</strong></h5>
        <form className="mt-4">
          <Label htmlFor="username">Username</Label>
          <Input name="username" type="text" value={this.state.username} onChange={this.handleChange} />
          <Label className="mt-3" htmlFor="password">Password</Label>
          <Input name="password" type="password" value={this.state.password} onChange={this.handleChange} />
					<button
						className="btn btn-primary mt-3"
						onClick={this.handleSubmit}
						type="submit"
					>Sign In</button>
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

export default SignIn;