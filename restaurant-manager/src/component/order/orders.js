import React, { Component } from 'react'
import * as firebase from 'firebase'
import { Modal } from 'react-bootstrap';

export default class Orders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
        }
    }

    componentDidMount() {
        var db = firebase.firestore().collection('orders');
        var restaurantId = firebase.auth().currentUser.uid;
        db.where('restaurant', '==', restaurantId)
            .onSnapshot((snapmshot) => {
                snapmshot.docChanges().forEach((change) => {
                    if (change.type === "added") {
                        this.setState({ orders: [...this.state.orders, change.doc.data()] })
                    }
                })
            })
    }

    close = () => {
        this.setState({ showModal: false })
    }

    render() {
        return (
            <div>
                <div className="sub-menu"> </div>
                <div className="d-flex heading-panel mt-5">
                    <h3 className="col-6 page-title">Lịch sử đơn hàng</h3>
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
                                        <tr key={key}>
                                            <td>{key}</td>
                                            <td>{val.username}</td>
                                            <td>{val.phoneNumber}</td>
                                            <td>{val.totalPrice}</td>
                                            <td>{val.status}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.modalHeading}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="d-flex">
                            <div className="col">
                                <div className="form-group">
                                    <label>Danh mục:</label>
                                    <input onChange={this.onChangeInput} name="newCategory" type="text" className="form-control" Value={this.state.oldCategoty} />
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-secondary" onClick={this.close}>Close</button>
                        <button className="btn btn-primary" onClick={this.onClickSave}>Lưu</button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}
