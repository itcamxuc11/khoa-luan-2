import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'
import * as firebase from 'firebase'
import AutoComplete from 'react-google-autocomplete'
import key from '../../config/googlemap'

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            items: [],
            showModal: false,

            editClass: '',
            userData: {},
            name: '',
            address: '',
            phoneNumber: 0,
            location: {},
        }
    }

    componentDidMount() {
        var db = firebase.firestore().collection('orders');
        var DBuser = firebase.firestore().collection('users');
        var userId = firebase.auth().currentUser.uid;

        DBuser.where(firebase.firestore.FieldPath.documentId(), '==', userId)
            .onSnapshot((snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    console.log(change.doc.data());
                    this.setState({
                        userData: change.doc.data(),
                    })
                });
            })

        db.where('user', '==', userId)
            .onSnapshot((snapmshot) => {
                snapmshot.docChanges().forEach((change) => {
                    if (change.type === "added") {
                        this.setState({ orders: [...this.state.orders, change.doc.data()] })
                    }
                })
            })
    }

    onClickDetail = (i) => {
        this.setState({
            showModal: true,
            items: this.state.orders[i].detail
        })
    }

    close = () => {
        this.setState({ showModal: false })
    }

    onEditClick = () => {
        this.setState({
            editClass: 'show',
            name: this.state.userData.name,
            address: this.state.userData.address,
            location: this.state.userData.location,
            description: this.state.userData.description,
            phoneNumber: this.state.userData.phoneNumber
        })
    }

    onSelected = (place) => {
        this.setState({ 
            address:place.formatted_address,
            location:{
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
        }})
    }

    onClickSave = () => {
        var DBUser = firebase.firestore().collection('users');
        var userId = firebase.auth().currentUser.uid;

        DBUser.doc(userId).set({
            ...this.state.userData,
            address: this.state.address,
            location: this.state.location,
            name: this.state.name,
            phoneNumber: this.state.phoneNumber,
        })
            .then(() => {
                this.setState({
                    editClass: '',
                })
            })
            .catch()

    }

    onChangeInput = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });
    }
    render() {
        return (
            <div className="container mb-5 pb-5">
                <div className="row">
                    <div className="col-4">
                        <div className="sub-menu"> </div>
                        <div className="d-flex heading-panel mt-5">
                            <h3 className="col-12 page-title">
                                <div className="input-group mb-3">
                                    <input type="text" Value={this.state.userData.name}
                                        onChange={this.onChangeInput} className={this.state.editClass + " form-control info-left"} name="name" />
                                    <div className="input-group-append">
                                        <span onClick={this.onEditClick} className="input-group-text info-right">
                                            <i className="fas fa-pencil-alt"></i>
                                        </span>
                                    </div>
                                </div>
                            </h3>
                        </div>
                        <div className="mt-3">
                            <div className="row">
                                <div className="col-12">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend ">
                                            <span className="input-group-text info-left">
                                                <i className="fas fa-map-marker-alt"></i>
                                            </span>
                                        </div>
                                        <AutoComplete className={this.state.editClass + " form-control info-right"} onPlaceSelected={this.onSelected} apiKey={key} types={['address']}
                                            componentRestrictions={{ country: "VN" }} Value={this.state.userData.address} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend ">
                                            <span className="input-group-text info-left">
                                                <i className="fas fa-mobile-alt"></i>
                                            </span>
                                        </div>
                                        <input type="number" className={this.state.editClass + " form-control info-right"}
                                            onChange={this.onChangeInput} Value={this.state.userData.phoneNumber} name="phoneNumber" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <button onClick={this.onClickSave} className={this.state.editClass + " btn btn-primary btn-hs"}>Lưu</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-8">
                        <div className="sub-menu"> </div>
                        <div className="d-flex heading-panel mt-5">
                            <h3 className="col-6 page-title">Lịch sử mua hàng</h3>
                            <div className="col-12">
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
            </div>
        )
    }
}
