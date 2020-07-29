import React, { Component } from 'react'
import * as firebase from 'firebase';
import { Redirect } from 'react-router-dom';

export default class Login extends Component {
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
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
                this.setState({
                    redirect: true
                })
            })
            .catch(function (error) {
                var errorMessage = error.message;
                alert(errorMessage);
            });
    }

    render() {

        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to='/' />;
        }
        return (
            <div id="root">
                <div className="App">
                    <div className="sc-fznyAO ejMHpf">
                        <div className="form-container">
                            <h2 className="mb-4">Đăng nhập</h2>
                            <form>
                                <input onChange={this.onChangeInput} name="email" type="email" placeholder="Email" className="mb-1 sc-AxiKw dVlCBT" />
                                <input onChange={this.onChangeInput} name="password" type="password" placeholder="Mật khẩu" className="mb-1 sc-AxiKw dVlCBT" />
                                <button type="button" onClick={this.onClickLogin} className="mb-1 sc-AxhCb gxxaVj">Đăng nhập</button>
                            </form>
                            <a href="/">Đăng ký</a>
                        </div>
                    </div>

                </div>
            </div>

        )
    }
}
