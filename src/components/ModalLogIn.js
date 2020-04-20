import React, { Component } from 'react';
import { Form, Modal, Button, Row, Card } from 'react-bootstrap';
import CreateUser from './CreateUser';
import { LinkContainer } from 'react-router-bootstrap';

class ModalLogIn extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				{!this.props.loggedIn ? (
					<Row>
						<div>
							<LoginModal
								//props
								centered={true}
								lg={4}
								md={4}
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
						</div>

						<div lg={4} md={4} />
						<div>
							<Card style={{ width: '18rem' }}>
								<Card.Body>
									<Card.Title>New to the Site?</Card.Title>
									<Card.Text>
										Haven't created a profile yet? Sign up through the link below.
									</Card.Text>
									<LinkContainer to="/create_user">
										<Card.Link> Sign Up </Card.Link>
									</LinkContainer>
								</Card.Body>
							</Card>
						</div>
					</Row>
				) : (
					<UserLoginModal logOut={this.props.logOut} />
				)}
			</div>
		);
	}
}

export default ModalLogIn;

function LoginModal(props) {
	return (
		<Form>
			<div className="link" variant="primary">
				<h1>Log In</h1>
			</div>
			<Form.Group controlId="formBasicEmail">
				<div style={{ color: props.displayColor }} id="login-status">
					{props.display}
				</div>
				<Form.Label>Email address</Form.Label>
				<Form.Control type="email" placeholder="Enter email" onChange={props.emailChange} value={props.email} />
				<Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
			</Form.Group>
			<Form.Group controlId="formBasicPassword">
				<Form.Label>Password</Form.Label>
				<Form.Control
					type="password"
					placeholder="Password"
					onChange={props.passwordChange}
					value={props.password}
				/>
			</Form.Group>
			<Button className="modal-button" variant="primary" type="submit" onClick={props.logIn}>
				Log In
			</Button>
			<Button className="modal-button" variant="secondary" onClick={props.forgotPasswordAtLogIn}>
				Forgot Password
			</Button>
			<Button className="modal-button" variant="primary" type="submit" onClick={props.logOut}>
				Log Out
			</Button>
		</Form>
	);
}

function UserLoginModal(props) {
	return (
		<Form>
			<div style={{ color: props.displayColor }} id="login-status">
				{props.display}
			</div>
			<Button className="modal-button" variant="outline-primary" onClick={props.logOut}>
				Log Out
			</Button>
			<Button className="modal-button" variant="secondary" onClick={props.resetPassword}>
				Reset Password
			</Button>
			<Button className="modal-button" variant="outline-secondary" onClick={props.changeEmail}>
				Change Email
			</Button>
		</Form>
	);
}
