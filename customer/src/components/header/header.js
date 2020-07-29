import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import * as firebase from 'firebase';
import Nav from './nav';

export class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            userLogined: null
        }

        firebase.auth().onAuthStateChanged((user) => {
            this.setState({ userLogined: user });
        })
    }

    getCartNumber = () => {
        let cartStorage = JSON.parse(localStorage.getItem('cart'));
        if (cartStorage) return <span className="basket-count pos-absolute">{cartStorage.total}</span>
        return null;
    }

    getCartStatus = (f) => {
        if (f === true) return 'show';
        return 'hide';
    }

    getCartInfo = () => {
        let cartStorage = JSON.parse(localStorage.getItem('cart'));
        if (cartStorage) return cartStorage.items;
        return [];
    }

    onChangeQuantity = (event, id) => {
        let val = event.target.value;
        let cartStorage = JSON.parse(localStorage.getItem('cart'));
        let items = cartStorage.items;
        let i = items.findIndex((obj) => {
            return obj.id == id
        })

        if (i !== -1) {
            let oldCount = items[i].count;
            let newTotal = cartStorage.total + (val - oldCount);
            if (val == 0) {
                items.splice(i, 1);
            }
            else items[i].count = val;
            let newCart = { items: items, total: newTotal };
            console.log(newTotal);
            this.props.upDateCart(JSON.stringify(newCart));
        }
    }

    order = () => {

        this.setState({
            redirect: true
        })
        this.props.showCart();

    }

    render() {
        const { redirect } = this.state;
        let direct = '';
        if (redirect) {
            direct = <Redirect to='/checkout' />
        }

        return (
            <div>
                {direct}
                <header className="header">
                    <div className="content">
                        <div className="header__inner"><a href="/"><img src="/images/logo_web.png" alt="Uber Eats" className="header__logo" /></a>
                            <div className="header__delivery-info"><label className="control">
                                <div className="control__input-wrapper tablet dropdown">
                                    <img src="/images/input.svg" alt="Address" className="control_icon" />
                                    <input type="text" name="address" placeholder="Địa chỉ" className="control_input control_input--small" />
                                    <ul className="dropdown-leagues">
                                    </ul>
                                </div>
                            </label>
                            </div>
                            <div className="header__search"><label className="control">

                            </label>
                            </div>
                            <Nav loginedUser={this.state.userLogined} />
                            <button onClick={this.props.showCart} className="header__link pos-relative" href="/basket">
                                <img title="basket" className="header-logo" src="/images/basket.svg" alt="basket" />
                                {this.getCartNumber()}
                            </button>
                        </div>
                    </div>
                </header>
                <div className={this.getCartStatus(this.props.onCheckout) + " modal"}>
                    <div className="checkout d-flex flex-colum">
                        <div className="checkout-header">
                            <div className="justify-content-end d-flex">
                                <button onClick={this.props.showCart}><img src="/images/close.svg" /></button>
                            </div>
                            <h3>Giỏ hàng</h3>
                        </div>
                        <table>
                            <thead>
                            </thead>
                            <tbody>
                                {
                                    this.getCartInfo().map((value, key) => {
                                        return (
                                            <tr key={key}>
                                                <td className="pr-0"><img className="item__img" alt="Double Sausage Egg McMuffin® Meal" src="https://d1ralsognjng37.cloudfront.net/65ef3c66-5dcb-41bc-842a-d9938ab68e31.jpeg" /></td>
                                                <td className="text pl-0">{value.name}</td>
                                                <td className="text">{value.price}</td>
                                                <td className="text"><input onChange={(event) => { this.onChangeQuantity(event, value.id) }}
                                                    type="number" Value={value.count} /></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                        <div className="checkout-footer">
                            <button onClick={this.order}>Đặt hàng</button>
                        </div>
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

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        showCart: () => {
            dispatch({
                type: 'SHOW_CART'
            })
        },

        upDateCart: (data) => {
            dispatch({
                type: 'UPDATE',
                data: data
            })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)