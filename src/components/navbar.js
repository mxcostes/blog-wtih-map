import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav } from 'react-bootstrap';

export default class NavBar extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}



	render() {
		return (
			<Navbar fixed="top" bg="dark" variant="dark" className="navContainer" expand="md" collapseOnSelect="true">
				<LinkContainer to="/" className="navbar-brand header-font">
					<Nav.Link >Travel Tracker</Nav.Link>
				</LinkContainer>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto">
						<LinkContainer to="/" className="navbar-item">
							<Nav.Link className="nav-link">Explore</Nav.Link>
						</LinkContainer>
            {this.props.loggedIn?
						<LinkContainer to={"/profile/" + this.props.user}  className="navbar-item">
							<Nav.Link className="nav-link">Profile</Nav.Link>
            </LinkContainer> 
            : null}
            {this.props.loggedIn?
						<LinkContainer to="/create" className="navbar-item">
							<Nav.Link className="nav-link">Create Blog Post</Nav.Link>
            </LinkContainer> 
            : null}
            {this.props.loggedIn?
						<LinkContainer to="/chatroom/" className="navbar-item">
							<Nav.Link className="nav-link">Chat</Nav.Link>
            </LinkContainer> 
            : null}
						<LinkContainer to="/user" className="navbar-item">
							<Nav.Link className="nav-link">
								{this.props.loggedIn ? 'Log Out' : 'Log In/Sign up'}
							</Nav.Link>
						</LinkContainer>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		);
	}
}
