import React, { Component } from 'react'
import AutoComplete from 'react-google-autocomplete';
import key from '../../config/googlemap';
import * as firebase from 'firebase';

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: '',
            email: '',
            password: '',
            phoneNumber: '',
            description: '',
            username: '',
            location: {},
        }
    }

    onChangeInput = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });
    }

    onSelected = (place) => {
        this.setState({
            address: place.formatted_address,
            location: {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng()
            }
        })
    }

    onClickRegister = () => {
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((doc)=>{
            firebase.firestore().collection('restaurants').doc(doc.user.uid)
            .set({
                name: this.state.name,
                address: this.state.address,
                location: this.state.location,
                description: this.state.description,
                phoneNumber: this.state.phoneNumber,
                username: this.state.username
            })
            .then(()=>{
                alert('Đăng ký thành công');
            })
        })
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage);
            // ...
        });
    }

    render() {
        return (
            <div id="root">
                <div className="App">
                    <header className="sc-AxjAm jSFHNi"><a href="/"><img src="https://www.ubereats.com/restaurant/_static/d388e65de8662293c3a262f4c2c7d93a.svg" alt="" /></a>
                        <div> <a href="/session" className="sc-AxirZ eXnrgg"><svg stroke="currentColor" fill="none" strokeWidth={2} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="icon" size={20} height={20} width={20} xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            <circle cx={12} cy={7} r={4} />
                        </svg>Đăng nhập</a><a href="/" className="sc-AxirZ kykAwD">Đăng ký</a></div>
                    </header>
                    <div className="sc-fzozJi dsnOpO">
                        <div className="home-container">
                            <div className="sc-fzoLsD kQmsoI">
                                <h2>Hợp tác với chúng tôi và nhận thêm doanh thu</h2>
                                <p>Doof Tsaf là một nền tảng công nghệ giúp các doanh nghiệp mở rộng phạm vi tiếp cận, làm hài lòng khách
                                hàng, và thúc đẩy lợi nhuận của họ. Hợp tác với chúng tôi hôm nay</p>
                            </div>
                            <div className="sc-fzpans faylyw item-container  form-container">
                                <h2>Đăng ký ngay</h2>
                                <form>
                                    <div className="sc-fzplWN kXmefM">
                                        <input onChange={this.onChangeInput} type="text" placeholder="Tên cửa hàng"
                                            name="name" className="sc-AxiKw dVlCBT" />
                                        <AutoComplete onPlaceSelected={this.onSelected} apiKey={key} types={['address']}
                                            placeholder="Địa chỉ" className="sc-AxiKw dVlCBT" componentRestrictions={{ country: "VN" }} />
                                        <input type="text" name="username" onChange={this.onChangeInput}
                                            placeholder="Tên người đăng ký" className="sc-AxiKw dVlCBT" />
                                    </div>
                                    <div className="sc-fzplWN kXmefM">
                                        <input type="number" name="phoneNumber" onChange={this.onChangeInput}
                                            placeholder="Số điện thoại" className="sc-AxiKw dVlCBT" />
                                        <input type="email" name="email" placeholder="Email" onChange={this.onChangeInput}
                                            className="sc-AxiKw dVlCBT" />
                                        <input type="password" name="password" onChange={this.onChangeInput}
                                            placeholder="Mật khẩu" className="sc-AxiKw dVlCBT" />
                                    </div>
                                    <div className="sc-fzplWN kXmefM">
                                        <input type="text" name="description" onChange={this.onChangeInput}
                                            placeholder="Mô tả" className="sc-AxiKw dVlCBT" />
                                    </div>
                                    <button onClick= {this.onClickRegister} type="button" className="sc-AxhCb gxxaVj">Đăng ký</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
