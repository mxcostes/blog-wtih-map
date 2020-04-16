import React, { Component } from 'react'
import { Form, Button } from "react-bootstrap";
import firebase from 'firebase'





// Initialize Firebase

class CreateUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            display: '',
            displayColor: 'red',
            
        }
    }

    componentDidMount = () => {
        firebase.auth().onAuthStateChanged(user => {
          if (user) {
            console.log(user)
            this.setState({
              display: `logged in as ${user.email}`,
              displayColor: 'green',
              logoutDisabled: false,
              loggedIn: true,
              user: user
            })
          } else {
            this.setState({
              logoutDisabled: true,
              loggedIn: false
            })
          }
        })
      }










render() {
    return (
        <Form >
            <Form.Group controlId="formBasicEmail">
                <div style={{ color: this.state.displayColor }} id="login-status">{this.state.display}</div>
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={this.props.emailChange} value={this.props.email} />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
</Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={this.props.passwordChange} value={this.props.password} />
            </Form.Group>
            <Button className="modal-button"  variant="primary"  type="button"  onClick={this.props.createUser}>
                Create User
            </Button>
            
        </Form>
    )
}
}

export default CreateUser

