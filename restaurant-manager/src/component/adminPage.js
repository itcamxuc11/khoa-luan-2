import React, { Component } from 'react'
import Header from './header/header'
import { BrowserRouter as Router, NavLink, Switch, Route } from 'react-router-dom'
import Resstaurants from './admin/resstaurants'
import Users from './admin/users'

export default class AdminPage extends Component {
    render() {
        return (
            <div className="container-fluid">
                <Router>
                    <div className="row">
                        <div className="col-2 px-1 left-menu position-fixed" id="sticky-sidebar">
                            <div className="logo-web">
                                <img src="/images/logo-web.png" />
                            </div>
                            <ul>
                                <li><NavLink to="/users" activeClassName="active"><i className="fas fa-utensils icon-left"></i>Người dùng</NavLink></li>
                                <li><NavLink to="/restaurants" activeClassName="active"><i className="fas fa-money-bill-alt icon-left"></i>Cửa hàng</NavLink></li>
                            </ul>
                        </div>
                        <div className="col offset-2">
                            <Header />
                            <Switch>
                                <Route path="/restaurants">
                                    <Resstaurants/>
                                </Route>
                                <Route path="/user">
                                    <Users/>
                                </Route>
                                <Route path="/">
                                    <Users/>
                                </Route>
                            </Switch>
                        </div>
                    </div>
                </Router>
            </div>
        )
    }
}
