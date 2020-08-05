import React, { Component } from 'react'
import * as firebase from 'firebase'
import { Redirect, Link } from 'react-router-dom';
export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',

        }
    }

    onChangeInput = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });
    }
    componentDidMount = () => {
        console.log(firebase.auth().currentUser);
    }

    onClickLogin = () => {
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then((doc) => {
                let user = doc.user;
                user.updateProfile({
                    displayName: this.state.displayName
                })
                firebase.firestore().collection('users').doc(user.uid)
                    .set({
                        name: this.state.displayName,
                        address: this.state.address,
                        email: this.state.email,
                        phoneNumber: this.state.phoneNumber,
                        role: 'user'
                    })
                    .then(() => {
                        this.setState({
                            redirect: true
                        })
                    })
            })
            .catch(function (error) {
                var errorMessage = error.message;
                alert(errorMessage);
            });
    }

    render() {

        const { redirect } = this.state;
        let direct = '';
        if (redirect) {
            direct = <Redirect to='/' />
        }

        return (
            <div id="root">
                {direct}
                <div className="App">
                    <div className="sc-fznyAO ejMHpf pt-3">
                        <div className="form-container">
                            <h2 className="mb-4">Đăng ký</h2>
                            <form>
                                <input onChange={this.onChangeInput} name="email" type="email" placeholder="Email" className="mb-1 sc-AxiKw dVlCBT" />
                                <input onChange={this.onChangeInput} name="password" type="password" placeholder="Mật khẩu" className="mb-1 sc-AxiKw dVlCBT" />
                                <input onChange={this.onChangeInput} name="displayName" type="text" placeholder="Tên đầy đủ" className="mb-1 sc-AxiKw dVlCBT" />
                                <input onChange={this.onChangeInput} name="address" type="text" placeholder="Địa chỉ" className="mb-1 sc-AxiKw dVlCBT" />
                                <input onChange={this.onChangeInput} name="phoneNumber" type="number" placeholder="Số điện thoại" className="mb-1 sc-AxiKw dVlCBT" />
                                <button type="button" onClick={this.onClickLogin} className="mb-1 sc-AxhCb gxxaVj">Đăng ký</button>
                            </form>
                            <Link to="/login">Đã có tài khoản?</Link>
                        </div>
                    </div>

                </div>
            </div>

        )
    }
}

