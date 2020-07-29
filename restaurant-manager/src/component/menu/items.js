import React, { Component } from 'react';
import * as firebase from 'firebase';
import { Modal } from 'react-bootstrap'

export default class Items extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            items: [],
            searchKey: '',
            selectedCategory: '',
            showModal: false,

            oldItem: { id: '', data: {} },
            newName: '',
            newDescription: '',
            newPrice: '',
            newCategory: '',
            modalHeading: 'Thêm sản phẩm'
        }
    }

    componentDidMount() {
        const db = firebase.firestore();
        var restaurantId = "UG7TYLe29eFmDYoJG3zx";

        var DBRestaurant = db.collection('restaurants').doc(restaurantId);
        DBRestaurant.get().then((doc) => {
            this.setState({ categories: doc.data().categories });
            doc.ref.collection('menu').onSnapshot((snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    if (change.type === "added") {
                        this.setState({
                            items: [...this.state.items, {
                                id: change.doc.id,
                                data: change.doc.data()
                            }]
                        })
                    }
                    if (change.type === "modified") {
                        let tmp = [...this.state.items];
                        let i = tmp.findIndex((item) => {
                            return item.id == change.doc.id;
                        })
                        tmp[i].data = change.doc.data();
                        this.setState({ item: tmp });
                    }
                    if (change.type === "removed") {
                        let tmp = [...this.state.items];
                        let i = tmp.findIndex((item) => {
                            return item.id == change.doc.id;
                        })
                        tmp.splice(i, 1);
                        this.setState({ items: tmp });
                    }
                });
            })
        })
    }

    onChangeCategorySelecting = (event) => {
        this.setState({ selectedCategory: event.target.value });
    }

    onSearchChange = (event) => {
        this.setState({ searchKey: event.target.value });
    }

    onClickDelete = (item) => {
        if (window.confirm('Bạn muốn xóa sản phẩm ' + item.data.name)) {
            var restaurantId = "UG7TYLe29eFmDYoJG3zx";
            const db = firebase.firestore();
            db.collection("restaurants").doc(restaurantId).get()
                .then((doc) => {
                    doc.ref.collection('menu').doc(item.id).delete().then(function () {
                        console.log("Document successfully deleted!");
                    }).catch(function (error) {
                        alert("Lỗi: ", error);
                    });
                })
                .catch((err) => {
                    alert(err);
                })
        }
    }

    onClickEdit = (item) => {
        this.setState({
            showModal: true,
            oldItem: item,
            modalHeading: 'Sửa sản phẩm ' + item.data.name,
            newName: item.data.name,
            newPrice: item.data.price,
            newDescription: item.data.description,
            newCategory: item.data.category,
        });
    }
    onClickAdd = () => {
        this.setState({
            showModal: true,
            oldItem: { id: '', data: {} },
            modalHeading: 'Thêm sản phẩm'
        });
    }

    onChangeInput = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });
    }

    onClickSave = () => {
        var restaurantId = "UG7TYLe29eFmDYoJG3zx";
        const db = firebase.firestore().collection("restaurants").doc(restaurantId);
        let newItem = {
            name: this.state.newName,
            price: this.state.newPrice,
            description: this.state.newDescription,
            category: this.state.newCategory
        }
        if (this.state.oldItem.id !== '') {
            db.get()
                .then((doc) => {
                    doc.ref.collection('menu').doc(this.state.oldItem.id).set(newItem).then(() => {
                        this.setState({ showModal: false });
                    }).catch((err) => { console.log(err) })
                })
        }
        else {
            db.get()
                .then((doc) => {
                    doc.ref.collection('menu').doc().set(newItem).then(() => {
                        this.setState({ showModal: false });
                    }).catch((err) => { console.log(err) })
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
                    <h3 className="col-6 page-title">Sản phẩm</h3>
                    <div className="col-6">
                        <button onClick={this.onClickAdd} className="my-btn btn-add">
                            <i className="fa fa-plus pr-2" aria-hidden="true"></i>
                    Thêm sản phẩm
                </button>
                    </div>
                </div>
                <div className="box-filter d-flex">
                    <div>
                        <i className="fas fa-search pr-1"></i>
                        <input onChange={this.onSearchChange} type="text" placeholder="Tìm" />
                    </div>
                    <div>
                        <select onChange={this.onChangeCategorySelecting}>
                            <option value=''>All</option>
                            {
                                this.state.categories.map((value, index) => {
                                    return <option key={index}>{value}</option>
                                })
                            }
                        </select>
                    </div>
                </div>
                <div className="data-box">
                    <table>
                        <thead>
                            <tr>
                                <th>Tên</th>
                                <th>Mô tả</th>
                                <th>Giá</th>
                                <th>Danh mục</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.items.filter((item) => {
                                    if (item.data.name.toLowerCase().indexOf(this.state.searchKey.toLowerCase()) > -1) return item
                                }).filter((item) => {
                                    if (this.state.selectedCategory === '' ||
                                        item.data.category === this.state.selectedCategory)
                                        return item;
                                })
                                    .map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{item.data.name}</td>
                                                <td>{item.data.description}</td>
                                                <td>{item.data.price}</td>
                                                <td>{item.data.category}</td>
                                                <td>
                                                    <button onClick={() => { this.onClickDelete(item) }} className="btn btn-outline-danger btn-sm rounded-0">
                                                        <i className="fa fa-trash"></i>
                                                    </button>
                                                    <button onClick={() => { this.onClickEdit(item) }} className="btn btn-outline-success btn-sm rounded-0">
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
                        <div className="row">
                            <div className="col-lg-6 col-md-12">
                                <div className="form-group">
                                    <label htmlFor="usr">Tên:</label>
                                    <input onChange={this.onChangeInput} name="newName" type="text" Value={this.state.oldItem.data.name} className="form-control" />
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-12">
                                <div className="form-group">
                                    <label>Mô tả:</label>
                                    <input onChange={this.onChangeInput} name="newDescription" type="text" className="form-control" Value={this.state.oldItem.data.description} />
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-12">
                                <div className="form-group">
                                    <label>Giá:</label>
                                    <input onChange={this.onChangeInput} name="newPrice" type="text" className="form-control" Value={this.state.oldItem.data.price} />
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-12">
                                <div className="form-group">
                                    <label>Danh mục:</label>
                                    <select onChange={this.onChangeInput} name="newCategory" className="form-control">
                                        {
                                            this.state.categories.map((value, index) => {
                                                return <option key={index}>{value}</option>
                                            })
                                        }
                                    </select>
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

