import React, { Component } from 'react'
import Items from './items';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    NavLink
} from "react-router-dom";
import Categories from './categories';

export default class Menu extends Component {
    render() {
        return (
            <div className="right-main">
                <Router>
                    <ul className="sub-menu d-flex">
                        <li ><NavLink activeClassName='active' to="/items">Sản phẩm</NavLink></li>
                        <li><NavLink activeClassName='active' to="/categories">Danh mục</NavLink></li>
                    </ul>
                    <Switch>
                        <Route path="/items">
                            <Items />
                        </Route>
                        <Route path="/categories">
                            <Categories />
                        </Route>
                        <Route path="/">
                            <Items />
                        </Route>
                    </Switch>
                </Router>
            </div>
        )
    }
}
