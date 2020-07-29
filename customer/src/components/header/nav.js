import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as firebase from 'firebase';


export default class Nav extends Component {

    onClickLogout = ()=>{
        firebase.auth().signOut();
    }
    render() {
        if(!this.props.loginedUser)
        return (
            <Link className="header__link" to="/login">Đăng nhập</Link>
        )
        else return (
            <span onClick={this.onClickLogout} className="header__link" to="/login">Đăng xuất</span>
        )
    }
}
