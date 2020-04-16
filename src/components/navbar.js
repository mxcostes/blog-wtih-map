import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {  Navbar, Nav } from 'react-bootstrap'

export default class NavBar extends Component {

  render() {
    return (
      <Navbar fixed="top" bg="dark" variant="dark" className='navContainer' expand='md' collapseOnSelect={true}>
      <Link to="/" className="navbar-brand">Travel Tracker</Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">          
          <Nav.Link className="navbar-item">
          <Link to="/" className="nav-link">Home</Link>
          </Nav.Link>
          <Nav.Link className="navbar-item">
          <Link to="/blogs" className="nav-link">Blogs</Link>
          </Nav.Link>
          <Nav.Link className="navbar-item">
          <Link to="/create" className="nav-link">Create Blog Post</Link>
          </Nav.Link>
          <Nav.Link className="navbar-item">
          <Link to="/user" className="nav-link">Log In</Link>
          </Nav.Link>
          <Nav.Link>
            <Link to='/create_user' className='nav-link'>Sign Up</Link>
        </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}