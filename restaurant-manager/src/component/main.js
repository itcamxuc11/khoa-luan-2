import React, { Component } from 'react'
import Menu from './menu/menu'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    NavLink,
    useHistory
} from "react-router-dom";
import Orders from './order/orders';
import Profile from './profile/profile';
import Header from './header/header';
import Analytics from './analytics/analytics';

export default class Main extends Component {

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
                                <li><NavLink to="/menu" activeClassName="active"><i className="fas fa-utensils icon-left"></i>Menu</NavLink></li>
                                <li><NavLink to="/order" activeClassName="active"><i className="fas fa-money-bill-alt icon-left"></i>Đơn hàng</NavLink></li>
                                <li><NavLink to="/analytics" activeClassName="active"><i className="fas fa-chart-line icon-left"></i> Analytic</NavLink></li>
                                <li><NavLink to="/profile" activeClassName="active"><i className="fa fa-user icon-left"></i>Thông tin</NavLink></li>
                            </ul>
                        </div>
                        <div className="col offset-2">
                            <Header/>
                            <Switch>
                                <Route path="/menu">
                                    <Menu />
                                </Route>
                                <Route path="/order">
                                    <Orders />
                                </Route>
                                <Route path="/profile">
                                    <Profile />
                                </Route>
                                <Route path="/analytics">
                                    <Analytics />
                                </Route>
                                <Route path="/">
                                    <Menu />
                                </Route>
                            </Switch>
                        </div>
                    </div>
                </Router>
            </div>
        )
    }
}
