import React, { Component } from 'react';
import './App.css';
import 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import HomeBody from './components/HomeBody';
import NavBar from './components/navbar';
import BlogList from './components/BlogList'
import EditPost from './components/EditPost'
import CreatePost from './components/CreatePost'
import CreateUser from './components/CreateUser'
import PostPage from './components/PostPage'
import ModalLogIn from './components/ModalLogIn';
import firebase from 'firebase'
var firebaseConfig = {
  apiKey: "AIzaSyBesdsI0SGGWq7L1y6UEFbmBe9VahiofIk",
  authDomain: "blog-with-map-b6367.firebaseapp.com",
  databaseURL: "https://blog-with-map-b6367.firebaseio.com",
  projectId: "blog-with-map-b6367",
  storageBucket: "blog-with-map-b6367.appspot.com",
  messagingSenderId: "830918142722",
  appId: "1:830918142722:web:3e4f731860a2282017b01b",
  measurementId: "G-TXCD69KPFE"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth()


class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loggedIn: false,
      email: '',
      password: '',
      display: '',
      displayColor: '',
      logoutDisabled: true,
      modalShow: false,
      userModalShow: false,
      user: ''
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
  emailChange = (event) => {
    this.setState({ email: event.target.value })
  }
  passwordChange = (event) => {
    this.setState({ password: event.target.value })
  }

  authState = ()=> {
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        user.getIdTokenResult().then(getIdTokenResult => {
          console.log(getIdTokenResult.claims)
        })
      }
    })
  }
  ////////////////LOG IN MODAL//////////////

  setModalShow = () => {
    this.state.modalShow ?
      this.setState({
        modalShow: false
      }) : this.setState({
        modalShow: true
      })
  }
  logIn = (event) => {
    event.preventDefault()
    const email = this.state.email;
    const password = this.state.password
    auth.signInWithEmailAndPassword(email, password).catch((error) => {
      console.log(error.message)
      if (!auth.currentUser) {
        this.setState({
          display: 'Invalid username or password',
          displayColor: 'red'
        })
      }
    })
    this.setState({
      email: '',
      password: '',
      userModalShow: false
    })
  }
  forgotPasswordAtLogIn = (event) => {
    if (this.state.email === '') {
      this.setState({
        display: 'Please fill out email field, then select "Forgot Password"',
        displayColor: 'orange'
      })
    } else {
      auth.sendPasswordResetEmail(this.state.email).then(() => {
        this.setState({
          display: 'Check email to reset password',
          displayColor: 'green'
        })
      }).catch((error) => {
        console.log(error.message)
      })
    }
  }

  //USER SETTINGS MODAL/////////////////////////////////////////

  setUserModalShow = () => {
    this.state.userModalShow ?
      this.setState({
        userModalShow: false
      }) : this.setState({
        userModalShow: true
      })
  }
  logOut = (event) => {
    event.preventDefault()
    if (auth.currentUser) {
      auth.signOut()
      console.log('user signed out')
    }
    this.setState({
      loggedIn: false,
      modalShow: false,
      display: ''
    })
  }

  resetPassword = (event) => {
    let email = (auth.currentUser.email)
    auth.sendPasswordResetEmail(email).then(() => {
      this.setState({
        display: 'Check email to reset password',
        displayColor: 'green'
      })
    }).catch((error) => {
      console.log(error.message)
    })
  }

  changeEmail = () => {
    if (!auth.currentUser) {
      this.setState({
        display: 'To change email, please sign in first.',
        displayColor: 'orange'
      })
    } else {
      let oldEmail = auth.currentUser.email
      let newEmail = prompt('Please enter new email.')
      auth.currentUser.updateEmail(newEmail).catch(error => {
        if (error) {
          this.setState({
            display: error.message,
            displayColor: 'red'
          })
        }
      })
      this.setState({
        display: `Email updated!  To undo changes, follow the link sent to ${oldEmail}`,
        displayColor: 'green'
      })
    }
  }

  createUser = (event) => {
    event.preventDefault()
    const email = this.state.email;
    const password = this.state.password
    console.log(email, password)
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        // ...

      });
      this.setState({
        display: 'New user create signed in as ' + email,
        displayColor: 'green'
      })
      
}

  render() {

    return (
      <div className="App">
        <Router>
      <NavBar />
      <br />
      <div className='container'>
        <Route path="/" exact component={HomeBody} />
        <Route path="/blogs" component={BlogList} />
        <Route path="/edit/:id" component={EditPost} />
        <Route path="/postpage/:id" component={PostPage} />
        <Route path="/create" user={this.state.user} component={CreatePost} />
        <Route path="/user">
          <ModalLogIn
            email={this.state.email}
            password={this.state.password}
            display={this.state.display}
            displayColor={this.state.displayColor}
            logoutDisabled={this.state.logoutDisabled}
            loggedIn={this.state.loggedIn}
            modalShow={this.state.modalShow}
            userModalShow={this.state.userModalShow}
            // methods
            toggleInput={this.toggleInput}
            setUserModalShow={this.setUserModalShow}
            setModalShow={this.setModalShow}
            emailChange={this.emailChange}
            passwordChange={this.passwordChange}
            logIn={this.logIn}
            logOut={this.logOut}
            forgotPasswordAtLogIn={this.forgotPasswordAtLogIn}
            resetPassword={this.resetPassword}
            changeEmail={this.changeEmail}/>
            </Route> 
        <Route path="/create_user"> 
        <CreateUser 
        authState={this.authState}
        createUser={this.createUser}
        email={this.state.email}
        password={this.state.password}
        display={this.state.display}
        displayColor={this.state.displayColor}   
        emailChange={this.emailChange}
        passwordChange={this.passwordChange}  /> 
        </Route>  
        </div>
     </Router>
      </div>
    );
  }
}

export default App;

