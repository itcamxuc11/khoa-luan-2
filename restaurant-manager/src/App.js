import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from './component/main';
import '@fortawesome/react-fontawesome';
import firebase from './config/firebase';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Register from './component/auth/register';
import Login from './component/auth/login';

import React, { Component } from 'react'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {user:null};
    firebase.auth().onAuthStateChanged( (user)=> {
      this.setState({ user: user });
    });
  }

  render() {
    if (this.state.user) {
      return (
        <Main />
      );
    } else {
      return (
        <Router>
          <div className="App">
            <Switch>
              <Route path="/register">
                <Register />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/">
                <Login />
              </Route>
            </Switch>
          </div>
        </Router>
      );
    }
  }
}


