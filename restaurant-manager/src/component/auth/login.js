import React, { Component } from 'react'
import * as firebase from 'firebase';
import { Link } from 'react-router-dom';

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
    componentDidMount = ()=>{
        console.log(firebase.auth().currentUser);
    }

    onClickLogin = ()=>{
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(()=>{
            
        })
        .catch(function(error) {
            var errorMessage = error.message;
            alert(errorMessage);
          });
    }

    render() {
        return (
            <div id="root">
                <div className="App">
                    <div className="sc-fznyAO ejMHpf">
                        <img src="images/logo-web.png" alt="" />
                        <div className="form-container">
                            <h2>Đăng nhập</h2>
                            <form>
                                <input onChange={this.onChangeInput} name="email" type="email" placeholder="Email" className="mb-1 sc-AxiKw dVlCBT" />
                                <input onChange={this.onChangeInput} name="password" type="password" placeholder="Mật khẩu" className="mb-1 sc-AxiKw dVlCBT"  />
                                <button type="button" onClick={this.onClickLogin} className="mb-1 sc-AxhCb gxxaVj">Đăng nhập</button>
                            </form>
                            <Link to="register">Đăng ký</Link>
                        </div>
                    </div>
                    <footer className="sc-fznKkj fEVKwf">
                        <span>© 2020 by
                             <a target="_blank" rel="noopener noreferrer" href="https://github.com/">Duy Tran</a>
                        </span>
                        <span>
                            <a href="/session">
                            </a>
                            |<a target="_blank" rel="noopener noreferrer" href="https://www.ubereats.com/restaurant/en-BR/signup">Doof Tsaf</a>
                        </span>
                    </footer>
                </div>
            </div>

        )
    }
}
