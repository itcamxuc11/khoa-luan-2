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
import AdminPage from './component/adminPage';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { user: null };
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase.firestore().collection('restaurants').doc(user.uid).get()
          .then((restaurant) => {
            if (restaurant.data()) this.setState({ user: { ...user, role: 'restaurants' } });
            else {
              firebase.firestore().collection('users').doc(user.uid).get()
                .then((doc) => {
                  if (doc && doc.data().role === 'admin') this.setState({ user: { ...user, role: 'admin' } });
                  else this.setState({ user: null });
                })
            }
          })
      }
      else this.setState({ user: null });
    });
  }

  render() {
    if (this.state.user) {
      if (this.state.user.role === 'admin')
        return (
          <AdminPage />
        );
      else return (
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


