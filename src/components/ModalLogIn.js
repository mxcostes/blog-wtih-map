import React, { Component } from 'react'
import { Form, Modal, Button } from 'react-bootstrap'

class ModalLogIn extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <>
        <div className="link" variant="primary" onClick={this.props.setModalShow}>
          Log In
      </div>
        <Form
          show={this.props.modalShow}
          onHide={this.props.setModalShow}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
            <LoginModal
              //props
              email={this.props.email}
              password={this.props.password}
              display={this.props.display}
              displayColor={this.props.displayColor}
              logoutDisabled={this.props.logoutDisabled}
              loggedIn={this.props.loggedIn}
              // methods
              emailChange={this.props.emailChange}
              passwordChange={this.props.passwordChange}
              logIn={this.props.logIn}
              logOut={this.props.logOut}
              forgotPasswordAtLogIn={this.props.forgotPasswordAtLogIn}
              changeEmail={this.props.changeEmail}
            />
        </Form>
      </>
    )
  }
}

export default ModalLogIn

function LoginModal(props) {
  return (
    <Form >
      <Form.Group controlId="formBasicEmail">
        <div style={{ color: props.displayColor }} id="login-status">{props.display}</div>
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={props.emailChange} value={props.email} />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
    </Form.Text>
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={props.passwordChange} value={props.password} />
      </Form.Group>
      <Button className="modal-button" variant="primary"  type="submit" onClick={props.logIn}>
        Log In
                </Button>
      <Button className="modal-button" variant="secondary" onClick={props.forgotPasswordAtLogIn}>
        Forgot Password
                </Button>
                <Button className="modal-button" variant="primary"  type="submit" onClick={props.logOut}>
        Log Out
                </Button>

    </Form>
  )
}
