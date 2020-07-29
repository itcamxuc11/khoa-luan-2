import React, { Component } from 'react'
import AutoComplete from 'react-google-autocomplete';
import key from '../../config/googlemap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: {
                lat: '10.871326',
                lng: '106.789129'
            },
            address: 'DHSPKT'
        }
    }

    onSelected = (place) => {
        this.props.search({
            location: {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng()
            },
            address: place.formatted_address
        })
        this.setState({
            location: {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng()
            },
        })
    }

    onBtnSearchClick = () => {
        this.props.search(this.state.location);
        console.log(this.state.location);
    }

    render() {
        return (
            <div>
                <div className="home-page">
                    <h3 className="search-title">Tìm quán ăn ở gần bạn</h3>
                    <div className="d-flex justify-content-center w-100">
                        <div className="search-box">
                            <div className="d-flex">
                                <div className="marker-icon">
                                    <img src="images/marker.png" />
                                </div>
                                <div className="fl-search">
                                    <AutoComplete onPlaceSelected={this.onSelected} apiKey={key} types={['address']} componentRestrictions={{ country: "VN" }} className="txt-search" placeholder="Địa chỉ" />
                                </div>
                            </div>
                        </div>
                        <div>
                            <Link to="/restaurants">
                                <button className="btn-search">
                                    Tìm
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        search: (data) => {
            dispatch({
                type: 'SEARCH',
                data: data
            })
        }
    }
}

export default connect(null, mapDispatchToProps)(Home);
