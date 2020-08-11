import './App.css';
import Header from './components/header/header';
import Register from './components/auth/register'
import Restaurant from './components/restaurant-page/restaurant';
import Footer from './components/footer/footer';
import Search from './components/search/search';
import Home from './components/home/home';
import * as firebase from 'firebase'
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import './config/firebase';
import Checkout from './components/checkout/checkout';
import Login from './components/auth/login';
import Notifier from './components/notifier.js/notifier';
import Profile from './components/profile/profile';
 import React, { Component } from 'react'
 
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { user: null };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          user:user
        })
      }
      else this.setState({ user: null });
    });
  }

  render() {
    if (this.state.user) {
      return (
        <div className="App">
          <Notifier />
          <Router>
            <Header />
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/restaurant/:id" component={Restaurant} />
              <Route path="/restaurants">
                <Search />
              </Route>
              <Route path="/checkout">
                <Checkout />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/register">
                <Register />
              </Route>
              <Route path="/myprofile">
                <Profile />
              </Route>
            </Switch>
            <Footer />
          </Router>
        </div>
      );
    }
    else return (
      <div className="App">
        <Notifier />
        <Router>
          <Header />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/restaurant/:id" component={Restaurant} />
            <Route path="/restaurants">
              <Search />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/">
              <Login />
            </Route>
          </Switch>
          <Footer />
        </Router>
      </div>
    );
  }
}

