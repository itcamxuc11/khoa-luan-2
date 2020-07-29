import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as firebase from 'firebase';
import { Link } from 'react-router-dom';

class Search extends Component {

    constructor(props) {
        super(props);
        this.state = { itemList: [] };
    }

    componentDidMount() {
        const db = firebase.firestore();
        var directionsService = new window.google.maps.DirectionsService();
        db.settings({
            timestampsInSnapshots: true
        });

        var DBRestaurant = db.collection('restaurants');
        DBRestaurant.get().then((itemList) => {
            itemList.forEach((item) => {
                let data = item.data();
                let id = item.id;
                var origin = new window.google.maps.LatLng(data.location.lat, data.location.lng);
                var des = new window.google.maps.LatLng(this.props.location.lat, this.props.location.lng);
                var route = {
                    origin: origin,
                    destination: des,
                    travelMode: 'DRIVING'
                }
                directionsService.route(route,
                    (response, status) => {
                        if (response.routes[0]) {
                            var directionsData = response.routes[0].legs[0]; // Get data about the mapped route
                            if (!directionsData) {
                                window.alert('Directions request failed');
                                return;
                            }
                            else {
                                this.setState({
                                    itemList: [...this.state.itemList, {
                                        id: id,
                                        data: data,
                                        distance: directionsData.distance.text,
                                        duration: directionsData.duration.text
                                    }]
                                })
                            }
                        }
                    })
            })
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
    }


    render() {
        return (
            <div className="content search-content">
                <h3 className="heading-page">{'Các quán ăn gần ' + this.props.address}</h3>
                <div className="container-item">
                    {
                        this.state.itemList.map((value, index) => {
                            return (
                                <Link key={index} to={"/restaurant/"+ value.id}>
                                    <div  className="item flex-colum item-search">
                                        <div className="store-banner">
                                            <img className="reponsive-img" src="https://d1sag4ddilekf6.cloudfront.net/compressed/merchants/5-CZCKJNWFLAEXV2/hero/bc5d650bc29e40d0a789e23cea051895_1590338521272011232.jpg" />
                                        </div>
                                        <h4 className="store-title">{value.data.name}</h4>
                                        <div className="store-des">
                                            {value.data.description}
                                        </div>
                                        <div className="store-des d-flex">
                                            <div className="rating">5</div>
                                            <div className="time-delivery">
                                                <h4>{value.distance + ' - ' + value.duration}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        location: state.searchReducer.location,
        address: state.searchReducer.address
    }
}

export default connect(mapStateToProps)(Search)
