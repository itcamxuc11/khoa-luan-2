import React, { Component } from 'react'
import * as firebase from 'firebase';


export default class Header extends Component {

    onClickLogout = ()=>{
        firebase.auth().signOut();
    }

    render() {
        return (
            <div className="row top-menu">
                <div onClick={this.onClickLogout} className="item">Logout</div>
            </div>
        )
    }
}
