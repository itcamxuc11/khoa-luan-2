import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'
import * as firebase from 'firebase'
export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            items: [],
            showModal: false,
        }
    }

    componentDidMount() {
        var db = firebase.firestore().collection('orders');
        var restaurantId = firebase.auth().currentUser.uid;
        db.where('user', '==', restaurantId)
            .onSnapshot((snapmshot) => {
                snapmshot.docChanges().forEach((change) => {
                    if (change.type === "added") {
                        this.setState({ orders: [...this.state.orders, change.doc.data()] })
                    }
                })
            })
    }

    onClickDetail = (i) => {
        let string = this.state.orders[i].detail;
        let detail = JSON.parse(string);
        this.setState({
            showModal: true,
            items: detail.items
        })
    }

    close = () => {
        this.setState({ showModal: false })
    }

    render() {
        return (
            <div className="container mb-5 pb-5">
                <div className="col-12">
                    <div className="sub-menu"> </div>
                    <div className="d-flex heading-panel mt-5">
                        <h3 className="col-6 page-title">Lịch sử mua hàng</h3>
                        <div className="col-6">
                        </div>
                    </div>
                    <div className="data-box">
                        <table>
                            <thead>
                                <tr>
                                    <td>STT</td>
                                    <th>Người mua</th>
                                    <th>Số điện thoại</th>
                                    <th>Tổng tiền</th>
                                    <th>Trạng thái</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.orders.map((val, key) => {
                                        return (
                                            <tr key={key + 1}>
                                                <td>{key}</td>
                                                <td>{val.username}</td>
                                                <td>{val.phoneNumber}</td>
                                                <td>{val.totalPrice}</td>
                                                <td>{val.status}</td>
                                                <td>
                                                    <button onClick={() => { this.onClickDetail(key) }} className="btn btn-outline-info">
                                                        Chi tiết
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <Modal show={this.state.showModal} onHide={this.close}>
                        <Modal.Header closeButton>
                            <Modal.Title>Chi tiết đơn hàng</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className=" mb-4">
                                <ul className="list-group mb-3">
                                    {
                                        this.state.items.map((value, key) => {
                                            return (
                                                <li key={key} className="list-group-item d-flex justify-content-between lh-condensed">
                                                    <div>
                                                        <h6 className="my-0">{value.name}</h6>
                                                        <small className="text-muted">{"x " + value.count}</small>
                                                    </div>
                                                    <span className="text-muted">{value.count * value.price + ' Đ'}</span>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <button className="btn btn-secondary" onClick={this.close}>Close</button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        )
    }
}
