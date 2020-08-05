import React, { Component } from 'react';
import { connect } from 'react-redux'


export class Item extends Component {

    constructor(props) {
        super(props);
    }

    addToCart = ()=>{
        var item = {
            id: this.props.id,
            name: this.props.name,
            price:this.props.price,
            description:this.props.description,
            count:1
        }

        this.props.addToCart(item);
    }
    
    render() {
        return (
            <div>
                <div className="item">
                    <div className="item__left">
                        <h3 className="item__title">{this.props.name}</h3>
                        <p className="item__description mb-1">
                            {this.props.description}
                        </p>
                        <div className="d-flex">
                            <p className="item__price col-10 mb-1">{this.props.price} Đ</p>
                            <p onClick={this.addToCart} className="col-2 mb-1 text-right p-0"><img className="add-cart" alt='add' src="/images/plus.svg" /></p>
                        </div>
                    </div>
                    <div className="item-right"><img className="item__img" alt="Meal" src={this.props.image} />
                    </div>
                </div>
            </div>
        )
    }
}


const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        addToCart: (item) => {
            dispatch({
                type:'ADD',
                item: item
            })
        }
    }
}

export default connect(null, mapDispatchToProps)(Item)
