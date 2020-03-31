import React from 'react';
import './App.css';
import 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import HomeBody from './components/HomeBody';
import Navbar from './components/navbar';
import BlogList from './components/BlogList'
import EditPost from './components/EditPost'
import CreatePost from './components/CreatePost'
import CreateUser from './components/CreateUser'
import PostPage from './components/PostPage'





function App() {
  return (
    <div className="App">
      <Router>
    <Navbar />
    <br />
    <div className='container'>
			<Route path="/" exact component={HomeBody} />
      <Route path="/blogs" component={BlogList} />
			<Route path="/edit/:id" component={EditPost} />
      <Route path="/postpage/:id" component={PostPage} />
			<Route path="/create" component={CreatePost} />
			<Route path="/user" component={CreateUser} />
      </div>
   </Router>
    </div>
  );
}

export default App;
