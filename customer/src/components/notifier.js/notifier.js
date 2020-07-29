import React, { Component } from 'react'
import { Alert, AlertContainer } from "react-bs-notifier";
import { connect } from 'react-redux';

class Notifier extends Component {
    render() {
        if (this.props.alertShow == true) return (
            <AlertContainer>
                <Alert timeout = {500} onDismiss = {this.props.hideAlert} type="success">Thêm thành công</Alert>
            </AlertContainer>
        );
        return null;
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        hideAlert: () => {
            dispatch(
                {
                    type: 'HIDE_ALERT'
                }
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        alertShow: state.cartReducer.alertShow
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Notifier)