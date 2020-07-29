import React, { Component } from 'react'

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
                            <h2 className="mb-4">Đăng ký</h2>
                            <form>
                                <input onChange={this.onChangeInput} name="email" type="email" placeholder="Email" className="mb-1 sc-AxiKw dVlCBT" />
                                <input onChange={this.onChangeInput} name="password" type="password" placeholder="Mật khẩu" className="mb-1 sc-AxiKw dVlCBT" />
                                <input onChange={this.onChangeInput} name="adress" type="text" placeholder="Địa chỉ" className="mb-1 sc-AxiKw dVlCBT" />
                                <input onChange={this.onChangeInput} name="phoneNumber" type="number" placeholder="Số điện thoại" className="mb-1 sc-AxiKw dVlCBT" />
                                <button type="button" onClick={this.onClickLogin} className="mb-1 sc-AxhCb gxxaVj">Đăng nhập</button>
                            </form>
                            <a href="/register">Đăng ký</a>
                        </div>
                    </div>

                </div>
            </div>

        )
    }
}
    
