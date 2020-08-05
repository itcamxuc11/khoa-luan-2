import React, { Component } from 'react'
import * as firebase from 'firebase'

export default class Resstaurants extends Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurants: [],
            searchKey: ''
        }
    }
    componentDidMount() {
        firebase.firestore().collection('restaurants').onSnapshot((snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if (change.type === 'added') {
                    this.setState({
                        restaurants: [...this.state.restaurants
                            , { id: change.doc.id, data: change.doc.data() }]
                    })
                }
                if(change.type==='removed'){
                    let restaurants = this.state.restaurants;
                    let id = change.doc.id;
                    let i = restaurants.findIndex((item)=>{return item.id === id});
                    restaurants.splice(i,1);
                    this.setState({
                        restaurants:restaurants
                    })
                }
            })
        })
    }

    onSearchChange = (event) => {
        this.setState({ searchKey: event.target.value });
    }

    onClickDelete = (item) => {
        if (window.confirm('Bạn muốn xóa ' + item.data.name)) {
            firebase.firestore().collection('restaurants').doc(item.id).get()
            .then((doc)=>{
                doc.ref.delete();
            })
        }
    }

    render() {
        return (
            <div className="right-main">
                <ul className="sub-menu d-flex">
                </ul>
                <div className="d-flex heading-panel">
                    <h3 className="col-6 page-title">Danh sách cửa hàng</h3>
                </div>
                <div className="box-filter d-flex">
                    <div>
                        <i className="fas fa-search pr-1"></i>
                        <input onChange={this.onSearchChange} type="text" placeholder="Tìm" />
                    </div>
                </div>
                <div className="data-box">
                    <table>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Tên</th>
                                <th>Mô tả</th>
                                <th>Đại chỉ</th>
                                <th>Số điện thoại</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.restaurants.filter((item) => {
                                    if (item.data.name.toLowerCase().indexOf(this.state.searchKey.toLowerCase()) > -1) return item
                                }).map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index}</td>
                                            <td>{item.data.name}</td>
                                            <td>{item.data.description}</td>
                                            <td className="over-text pr-3">{item.data.address}</td>
                                            <td>{item.data.phoneNumber}</td>
                                            <td>
                                                <button onClick={() => { this.onClickDelete(item) }} className="btn btn-outline-danger btn-sm rounded-0">
                                                    <i className="fa fa-trash"></i>
                                                </button>
                                                <button className="btn btn-outline-success btn-sm rounded-0">
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
            </div>
        )
    }
}
