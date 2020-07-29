import React, { Component } from 'react'

export default class Orders extends Component {
    render() {
        return (
            <div className="right-main">
                <div>
                    <div className="d-flex heading-panel">
                        <h3 className="col-6 page-title">Lịch sử bán hàng</h3>
                        <div className="col-6">
                        </div>
                    </div>
                    <div className="box-filter d-flex">
                        <div>
                            <i className="fas fa-search pr-1"></i>
                            <input type="text" placeholder="Tìm" />
                        </div>
                        <div>
                            <select>
                                <option>All</option>
                                <option>1</option>
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
                                <tr className="first-row">
                                    <td>Alfreds Futterkiste</td>
                                    <td>Maria Anders</td>
                                    <td>Germany</td>
                                </tr>
                                <tr>
                                    <td>Centro comercial Moctezuma</td>
                                    <td>Francisco Chang</td>
                                    <td>Mexico</td>
                                </tr>
                                <tr>
                                    <td>Ernst Handel</td>
                                    <td>Roland Mendel</td>
                                    <td>Austria</td>
                                </tr>
                                <tr>
                                    <td>Island Trading</td>
                                    <td>Helen Bennett</td>
                                    <td>UK</td>
                                </tr>
                                <tr>
                                    <td>Laughing Bacchus Winecellars</td>
                                    <td>Yoshi Tannamuri</td>
                                    <td>Canada</td>
                                </tr>
                                <tr>
                                    <td>Magazzini Alimentari Riuniti</td>
                                    <td>Giovanni Rovelli</td>
                                    <td>Italy</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}
