import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as firebase from 'firebase';
import { Redirect } from 'react-router-dom';

class Checkout extends Component {
    constructor(props) {
        super(props);
        let cartStorage = JSON.parse(localStorage.getItem('cart'));
        if (cartStorage) {
            let items = cartStorage.items;
            let total = 0;
            for (let i = 0; i < items.length; i++) {
                total += items[i].price * items[i].count;
            }
            this.state = {
                items: cartStorage.items,
                count: cartStorage.total,
                total: total,
            }
        }
        else {
            this.state = {
                items: [],
                count: 0,
                total: 0
            }
        }
        firebase.auth().onAuthStateChanged((user) => {
            if (!user)
                this.setState({
                    redirect: true,
                    path: '/login'
                })
        })
    }

    onSubmitHandler = (event) => {
        event.preventDefault();
        const db = firebase.firestore();
        var restaurantId = localStorage.getItem('id');
        db.collection('orders').doc().set({
            username: this.state.name,
            address: this.state.address,
            phoneNumber: this.state.phoneNumber,
            totalPrice: this.state.total,
            detail: this.state.items,
            restaurant: restaurantId,
            date: new Date(),
            user: firebase.auth().currentUser.uid,
            status: 'Chờ xác nhận',
        }).then(() => {
            alert('Đặt thành công');
            localStorage.removeItem('cart');
            this.setState({
                redirect: true,
                path: '/'
            })
        })
    }
    onChangeInput = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });
    }

    render() {

        const { redirect } = this.state;
        let direct = '';
        if (redirect) {
            direct = <Redirect to={this.state.path} />
        }
        return (
            <div className="container mb-5">
                {direct}
                <div className="py-5 text-center">
                    <h2>Xác nhận đặt hàng</h2>
                </div>
                <div className="row">
                    <div className="col-md-4 order-md-2 mb-4">
                        <h4 className="d-flex justify-content-between align-items-center mb-3">
                            <span className="text-muted">Giỏ hàng</span>
                            <span className="badge badge-secondary badge-pill">{this.state.count}</span>
                        </h4>
                        <ul className="list-group mb-3">
                            {
                                this.state.items.map((value, key) => {
                                    return (
                                        <li key={key} className="list-group-item d-flex justify-content-between lh-condensed">
                                            <div>
                                                <h6 className="my-0">{value.name}</h6>
                                                <small className="text-muted">{"x " + value.count}</small>
                                            </div>
                                            <span className="text-muted">{value.count * value.price}</span>
                                        </li>
                                    )
                                })
                            }
                            <li className="list-group-item d-flex justify-content-between">
                                <span>Tổng (VNĐ)</span>
                                <strong>{this.state.total}</strong>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-8 order-md-1">
                        <h4 className="mb-3">Thông tin người mua</h4>
                        <form onSubmit={this.onSubmitHandler} className="needs-validation" noValidate>
                            <div className="row">
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email">Tên <span className="text-muted"></span></label>
                                <input onChange={this.onChangeInput} type="text" className="form-control" name="name" placeholder="Nguyen van a" />
                                <div className="invalid-feedback">
                                    Please enter a valid email address for shipping updates.
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="address">Địa chỉ</label>
                                <input type="text" onChange={this.onChangeInput} className="form-control" name="address" placeholder="12 Hoàng Diệu 2" required />
                                <div className="invalid-feedback">
                                    Please enter your shipping address.
                                 </div>
                            </div>
                            <div className="mb-3">
                                <label>Số điện thoại <span className="text-muted"></span></label>
                                <input type="text" onChange={this.onChangeInput} className="form-control" name="phoneNumber" placeholder="091234567" />
                            </div>
                            <hr className="mb-4" />
                            <button className="btn btn-primary btn-lg btn-block" type="submit">Đặt hàng</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        tmp: state.cartReducer.folowCart,
        onCheckout: state.cartReducer.onCheckout
    }
}

export default connect(mapStateToProps)(Checkout)