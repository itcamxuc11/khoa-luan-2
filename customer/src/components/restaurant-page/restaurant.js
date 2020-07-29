import React, { Component } from 'react'
import * as firebase from 'firebase';
import Item from './item'
export default class Restaurant extends Component {

    constructor(props) {
        super(props);
        this.state = {
            restaurantName: '',
            restaurantAdress: '',
            description:'',
            categories: [],
            itemList: []
        };
    }

    componentDidMount() {
        var restaurantId = this.props.match.params.id;
        localStorage.setItem('id',restaurantId);
        const db = firebase.firestore();
        var DBRestaurant = db.collection('restaurants').doc(restaurantId);
        DBRestaurant.get().then((doc) => {
            if (doc.exists) {
                var data = doc.data();
                let categories = [];
                if(data.categories) categories = data.categories;
                this.setState({
                    restaurantName: data.name,
                    restaurantAdress: data.address,
                    description: data.description,
                    categories: categories
                })
                doc.ref.collection('menu').get().then((itemList) => {
                    let items = [];
                    itemList.forEach((item) => {
                        items.push({ id: item.id, data: item.data() });
                    })
                    this.setState({
                        itemList: items
                    })
                })
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
    }

    render() {
        return (
            <div className="page">
                <main>
                    <div className="restaurant-page restaurant">
                        <div className="hero">
                            <div className="restaurant-page__img-wrapper"><img src="https://d1ralsognjng37.cloudfront.net/43976b06-3271-4476-bdd6-5f37ac5db65e" alt="" className="restaurant-page__img" /></div>
                            <div className="restaurant-page__title page__title">
                                <h1 className="page__title_indent title">{this.state.restaurantName}</h1>
                                <p className="page__title_indent categories">{this.state.description}</p>
                                <p className="eta">20–30 min</p>
                                <div className="location-wrapper">
                                    <p className="location">{this.state.restaurantAdress}</p><a href="https://www.google.com.ua/maps /@50.4851493,30.4721233,14z?hl=ru" className="location__info"><span className="location__dot">•</span>Map</a>
                                </div>
                            </div>
                            <div className="content" />
                        </div>
                        <div className="content">
                            <nav className="restaurant__menu">
                                <ul className="restaurant__menu-items menu">
                                    {
                                        this.state.categories.map((value, key) => {
                                            return (
                                                <li key={key} className="menu__item">
                                                    <a href={"#" + value}>
                                                        <p className="menu__item-btn">{value}</p>
                                                    </a>
                                                </li>)
                                        })
                                    }
                                </ul>
                            </nav>
                            <div className="restaurant__main">
                                {
                                    this.state.categories.map((value, key) => {
                                        return (
                                            <section key={key} id={value} className="restaurant__items items">
                                                <h2 className="restaurant-title">{value}</h2>
                                                <div className="container-item">
                                                    {
                                                        this.state.itemList.filter(item => item.data.category === value).map((val, index) => {
                                                            return (
                                                                <Item id={val.id} key={index} name={val.data.name} price={val.data.price}
                                                                    description={val.data.description} />
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </section>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </main>
            </div>

        )
    }
}
