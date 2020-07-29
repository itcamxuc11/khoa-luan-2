import React, { Component } from 'react';
import { Modal, ThemeProvider } from 'react-bootstrap';
import * as firebase from 'firebase';

export default class Categories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurantData: {
                categories: []
            },
            showModal: false,

            oldCategoty: '',
            newCategory: '',
            modalHeading: 'Thêm danh mục'
        }
    }

    componentDidMount() {
        var DBRestaurant = firebase.firestore().collection('restaurants');
        var restaurantId = firebase.auth().currentUser.uid;

        DBRestaurant.where(firebase.firestore.FieldPath.documentId(), '==', restaurantId)
            .onSnapshot((snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    if (change.type === "added") {
                        this.setState({
                            restaurantData: change.doc.data()
                        })
                    }
                    if (change.type === "modified") {
                        this.setState({
                            restaurantData: change.doc.data()
                        })
                    }

                    if (change.type === "removed") {
                        this.setState({
                            restaurantData: change.doc.data()
                        })
                    }
                });
            })
    }

    onClickDelete = (category) => {
        if (window.confirm('Xóa danh mục ' + category +
            ' và các sản phẩm thuộc danh mục này')) {
            var DBRestaurant = firebase.firestore().collection('restaurants');
            var restaurantId = firebase.auth().currentUser.uid;
            DBRestaurant.doc(restaurantId).set({
                ...this.state.restaurantData,
                categories: this.state.restaurantData.categories.filter(x => x != category)
            })
            DBRestaurant.doc(restaurantId).get()
                .then((doc) => {
                    doc.ref.collection('menu').where('category', '==', category).get()
                        .then((items) => {
                            items.forEach((item) => {
                                item.ref.delete();
                            })
                        })
                })
                .catch()
        }
    }

    onClickAdd = () => {
        this.setState({
            modalHeading: "Thêm danh mục",
            oldCategoty: '',
            showModal: true
        })
    }

    onClickEdit = (category) => {
        this.setState({
            modalHeading: "Sửa",
            oldCategoty: category,
            showModal: true
        })
    }

    onChangeInput = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });
    }

    onClickSave = () => {
        var DBRestaurant = firebase.firestore().collection('restaurants');
        var restaurantId = firebase.auth().currentUser.uid;
        if (this.state.oldCategoty === '') {
            DBRestaurant.doc(restaurantId).set({
                ...this.state.restaurantData,
                categories: [...this.state.restaurantData.categories, this.state.newCategory]
            }).then(()=>{
                this.setState({showModal:false});
            })
        }
        else {
            let tmp = this.state.restaurantData.categories;
            let i = tmp.findIndex((x) => { return x == this.state.oldCategoty });
            tmp[i] = this.state.newCategory;
            DBRestaurant.doc(restaurantId).set({
                ...this.state.restaurantData,
                categories: tmp
            })
            DBRestaurant.doc(restaurantId).get()
            .then((doc) => {
                doc.ref.collection('menu').where('category', '==', this.state.oldCategoty).get()
                    .then((items) => {
                        items.forEach((item) => {
                            item.ref.update({
                                ...item.data(),
                                category:this.state.newCategory
                            }).then(()=>{
                                this.setState({showModal:false});
                            })
                        })
                    })
            })
        }
    }

    close = () => {
        this.setState({ showModal: false })
    }

    render() {
        return (
            <div>
                <div className="d-flex heading-panel">
                    <h3 className="col-6 page-title">Danh mục</h3>
                    <div className="col-6">
                        <button onClick={this.onClickAdd} className="my-btn btn-add">
                            <i className="fa fa-plus pr-2" aria-hidden="true"></i>
                    Thêm danh mục
                </button>
                    </div>
                </div>
                <div className="data-box">
                    <table>
                        <thead>
                            <tr>
                                <th>Danh mục</th>
                                <th>Tùy chọn</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.restaurantData.categories.map((value, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{value}</td>
                                            <td>
                                                <button onClick={() => { this.onClickDelete(value) }} className="btn btn-outline-danger btn-sm rounded-0">
                                                    <i className="fa fa-trash"></i>
                                                </button>
                                                <button onClick={() => { this.onClickEdit(value) }} className="btn btn-outline-success btn-sm rounded-0">
                                                    <i className="fa fa-edit"></i>
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
