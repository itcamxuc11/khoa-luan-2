import React from 'react';
import './App.css';
import Header from './components/header/header';
import Restaurant from './components/restaurant-page/restaurant';
import Footer from './components/footer/footer';
import Search from './components/search/search';
import Home from './components/home/home';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import './config/firebase';
import Checkout from './components/checkout/checkout';
import Login from './components/auth/login';

function App() {
  return (
    <div className="App">
            <Router>
      <Header />
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route path="/restaurant/:id" component={Restaurant}/> 
          <Route path="/restaurants">
            <Search/>
          </Route>
          <Route path="/checkout">
            <Checkout/>
          </Route>
          <Route path="/login">
            <Login/>
          </Route>
        </Switch>
      <Footer />
      </Router>
    </div>
  );
}

export default App;
