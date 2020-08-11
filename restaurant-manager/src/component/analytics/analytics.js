import React, { Component } from 'react'
import * as firebase from 'firebase'
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Graphex from './graphex';


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042',"#DC143C","#2F4F4F"];
const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
    cx, cy, midAngle, innerRadius, outerRadius, percent, index,
}) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};


export default class Analytics extends Component {
    static jsfiddleUrl = 'https://jsfiddle.net/alidingling/c9pL8k61/';
    constructor(props) {
        super(props);
        this.state = {
            curentMonth: (new Date()).getMonth(),
            data: [
                {
                    name: "Tháng 1", value: 0
                },
                {
                    name: "Tháng 2", value: 0
                },
                {
                    name: "Tháng 3", value: 0
                },
                {
                    name: "Tháng 4", value: 0
                },
                {
                    name: "Tháng 5", value: 0
                },
                {
                    name: "Tháng 6", value: 0
                },
                {
                    name: "Tháng 7", value: 0
                },
                {
                    name: "Tháng 8", value: 0
                },
                {
                    name: "Tháng 9", value: 0
                },
                {
                    name: "Tháng 10", value: 0
                },
                {
                    name: "Tháng 11", value: 0
                },
                {
                    name: "Tháng 12", value: 0
                }
            ],
            data2: []
        }
    }


    componentDidMount() {
        var db = firebase.firestore().collection('orders');
        var restaurantId = firebase.auth().currentUser.uid;
        db.where('restaurant', '==', restaurantId)
            .onSnapshot((snapmshot) => {
                snapmshot.docChanges().forEach((change) => {
                    if (change.type === "added") {
                        if (change.doc.data().status === "Đã giao hàng") {
                            let date = new Date(1000 * change.doc.data().date.seconds);
                            let month = date.getMonth();
                            let data = this.state.data;
                            data[month].value += change.doc.data().totalPrice;
                            this.setState({
                                data: data
                            })
                            let items = change.doc.data().detail;
                            let data2 = this.state.data2;
                            items.forEach((item) => {
                                let i = data2.findIndex((x) => { return x.id === item.id });
                                if (i > -1) {
                                    data2[i].sales += (item.price * item.count);
                                }
                                else data2.push({
                                    id: item.id,
                                    name: item.name,
                                    sales: item.price * item.count
                                })
                            })
                            this.setState({ data2: data2 });
                        }
                    }
                })
            })
    }

    getDataProductChart = () => {
        if (this.state.data2.length <= 5) return this.state.data2;
        else {
            let othreSales = 0;
            for (let i = 5; i < this.state.data2.length; i++) {
                othreSales  += this.state.data2[i].sales;
            }
            let tmp = this.state.data2.slice(0,6);
            tmp.push({name:"Khác", sales:othreSales});
            return tmp;
        }
    }

    render() {
        return (
            <div>
                <div className="sub-menu"> </div>
                <div className="d-flex heading-panel mt-5">
                    <h3 className="col-6 page-title">Biểu đồ doanh thu hàng tháng</h3>
                    <div className="col-6">
                    </div>
                </div>
                <ResponsiveContainer className="chart" height={350}>
                    <LineChart
                        width={600}
                        height={400}
                        data={this.state.data.slice(0, this.state.curentMonth + 1)}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                        <XAxis dataKey="name" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="5 5" />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
                <div className="d-flex heading-panel mt-5 pb-0">
                    <h3 className="col-6 page-title">Các sản phẩm nổi bật</h3>
                    <div className="col-6">
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <ResponsiveContainer className="chart" height={300}>
                            <PieChart>
                                <Pie
                                    data={this.getDataProductChart()}
                                    labelLine={false}
                                    label={renderCustomizedLabel}
                                    outerRadius={150}
                                    fill="#8884d8"
                                    dataKey="sales">
                                    {
                                        this.state.data2.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                                    }
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="col-6">
                        <Graphex data={this.state.data2} />
                    </div>
                </div>
                <div className="mb-3"></div>
            </div>
        )
    }
}
