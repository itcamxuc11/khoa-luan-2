import React, { Component } from 'react'

export default class Graphex extends Component {
    render() {
        return (
            <div>
                {
                    this.props.data.map((value, key) => {
                        return (
                            <div key={key} className="row mt-2">
                                <div style={{ backgroundColor: COLORS[key] }} className="col-1">
                                </div>
                                <div className="ml-2 d-11">
                                    <h4>{value.name}</h4>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];