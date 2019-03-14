import React, { Component } from "react";
// import API from "../utils/API";
import { Label, FormGroup, Input, TextArea, FormBtn } from "../components/Form";
import { Col, Row, Container } from "../components/Grid";
// import { isDate } from "util";
import axios from 'axios'


class SignUp extends Component {
    constructor() {
      super()
      this.state = {
        username: '',
        password: '',
        confirmPassword: '',
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
        password: this.state.password
      })
        .then( response => {
          console.log(response)
          if(!response.data.error) {
            console.log('succesful signup')
            this.setState({
              redirectTo: '/login'
            })
          } else {
            console.log('username already taken')
          }
          }).catch(error => {
            console.log(error)
          })
      }
    

    render() {
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
					<button
						className="btn btn-primary mt-3"
						onClick={this.handleSubmit}
						type="submit"
					>Sign up</button>
				</form>


        </div>
        </div>
        </Col>
      </Row>
    </Container>
    )
    }
}

export default SignUp;