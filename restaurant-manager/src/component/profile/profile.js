import React, { Component } from 'react';
import * as firebase from 'firebase';
import key from '../../config/googlemap';
import AutoComplete from 'react-google-autocomplete';

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editClass: '',
            restaurantData: {},
            name: '',
            address: '',
            description: '',
            phoneNumber: 0,
            location: {},
        }
    }

    onEditClick = () => {
        this.setState({
            editClass: 'show',
            name: this.state.restaurantData.name,
            address: this.state.restaurantData.address,
            location: this.state.restaurantData.location,
            description: this.state.restaurantData.description,
            phoneNumber: this.state.restaurantData.phoneNumber
        })
    }

    componentDidMount() {
        var DBRestaurant = firebase.firestore().collection('restaurants');
        var restaurantId = "UG7TYLe29eFmDYoJG3zx";

        DBRestaurant.where(firebase.firestore.FieldPath.documentId(), '==', restaurantId)
            .onSnapshot((snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    this.setState({
                        restaurantData: change.doc.data(),
                    })
                });
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
        var DBRestaurant = firebase.firestore().collection('restaurants');
        var restaurantId = "UG7TYLe29eFmDYoJG3zx";

        DBRestaurant.doc(restaurantId).set({
            ...this.state.restaurantData,
            address: this.state.address,
            location: this.state.location,
            name: this.state.name,
            phoneNumber: this.state.phoneNumber,
            description: this.state.description
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
            <div className="right-main">
                <div>
                    <div className="d-flex heading-panel">
                        <h3 className="col-6 page-title">
                            <div className="input-group mb-3">
                                <input type="text" Value={this.state.restaurantData.name}
                                    onChange={this.onChangeInput} className={this.state.editClass + " form-control info-left"} name="name" />
                                <div className="input-group-append">
                                    <span onClick={this.onEditClick} className="input-group-text info-right">
                                        <i className="fas fa-pencil-alt"></i>
                                    </span>
                                </div>
                            </div>
                        </h3>
                        <div className="col-6">
                        </div>
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
                                    <AutoComplete className={this.state.editClass + " form-control info-right"}  onPlaceSelected={this.onSelected} apiKey={key} types={['address']}
                                        componentRestrictions={{ country: "VN" }} Value={this.state.restaurantData.address} />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend ">
                                        <span className="input-group-text info-left">
                                            <i className="fas fa-file-medical"></i>
                                        </span>
                                    </div>
                                    <input type="text" className={this.state.editClass + " form-control info-right"}
                                        onChange={this.onChangeInput} Value={this.state.restaurantData.description} name="description" />
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
                                        onChange={this.onChangeInput} Value={this.state.restaurantData.phoneNumber} name="phoneNumber" />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <button onClick={this.onClickSave} className={this.state.editClass + " btn btn-primary btn-hs"}>Lưu</button>
                                <button className={this.state.editClass + " ml-1 btn btn-danger btn-hs"}>Hủy</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
