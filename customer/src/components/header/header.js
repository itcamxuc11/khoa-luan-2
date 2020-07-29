import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as firebase from 'firebase';
import Nav from './nav';

export class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            userLogined: null
        }

        firebase.auth().onAuthStateChanged( (user) =>{
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

    order = () => {
        this.props.showCart();
        this.setState({
            redirect: true
        })
    }

    render() {
        const { redirect } = this.state;

        if (redirect) {
            return <Redirect to='/checkout' />;
        }

        return (
            <div>
                <header className="header">
                    <div className="content">
                        <div className="header__inner"><a href="/"><img src="/images/logo_web.png" alt="Uber Eats" className="header__logo" /></a>
                            <div className="header__delivery-info"><label className="control">
                                <div className="control__input-wrapper tablet dropdown"><img src="/images/input.svg" alt="Address" className="control_icon" /><input type="text" name="address" placeholder="Address" className="control_input control_input--small" defaultValue />
                                    <ul className="dropdown-leagues">
                                    </ul>
                                </div>
                            </label>
                            </div>
                            <div className="header__search"><label className="control">
                                <div className="control__input-wrapper tablet"><img src="/images/search.svg" alt="Search" className="control_icon" /><input type="text" name="search" placeholder="Search" className="control_input control_input--small" defaultValue /></div>
                            </label>
                            </div>
                            <div className="header__toggle-buttons">
                                <button type="button" className="header__toggle-btn">
                                    <img src="/images/location.svg" alt="place icon" />
                                </button>
                                <button type="button" className="header__toggle-btn">
                                    <img src="/images/search.svg" alt="search icon" />
                                </button>
                            </div>
                            <button onClick={this.props.showCart} className="header__link pos-relative" href="/basket">
                                <img title="basket" className="header-logo" src="images/basket.svg" alt="basket" />
                                {this.getCartNumber()}
                            </button>
                            <Nav loginedUser = {this.state.userLogined} />
                        </div>
                    </div>
                </header>
                <div className={this.getCartStatus(this.props.onCheckout) + " modal"}>
                    <div className="checkout d-flex flex-colum">
                        <div className="checkout-header">
                            <div className="justify-content-end d-flex">
                                <button onClick={this.props.showCart}><img src="images/close.svg" /></button>
                            </div>
                            <h3>Giỏ hàng</h3>
                        </div>
                        <table>
                            <thead>
                            </thead>
                            <tbody>
                                {}
                                {
                                    this.getCartInfo().map((value, key) => {
                                        return (
                                            <tr key={key}>
                                                <td className="pr-0"><img className="item__img" alt="Double Sausage Egg McMuffin® Meal" src="https://d1ralsognjng37.cloudfront.net/65ef3c66-5dcb-41bc-842a-d9938ab68e31.jpeg" /></td>
                                                <td className="text pl-0">{value.name}</td>
                                                <td className="text">{value.price}</td>
                                                <td className="text"><input type="number" Value={value.count} /></td>
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
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)