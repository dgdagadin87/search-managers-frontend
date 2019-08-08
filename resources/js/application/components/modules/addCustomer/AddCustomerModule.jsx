import React, {Component} from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {
    changeTitle
} from '../../../actions/common';
import {
    asyncAddCustomer
} from '../../../actions/customer';

import Message from 'antd/lib/message';

import Header from './header/Header';
import Details from './details/Details';


const mapStateToProps = (state) => {
    return {
        disabled: state.customerData.disabled,
        orgTypes: state.commonData.orgTypes
    };
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        changeTitle,
        asyncAddCustomer
    }, dispatch);
}


class CustomerModule extends Component {

    constructor(...props){

        super(...props);

        this._customerData = {};
    }

    _showWarningMessage () {

        Message.error('Заполните поле "ФИО Заказчика"');
    };

    componentDidMount() {

        const {changeTitle} = this.props;

        changeTitle('Добавление заказчика');
    }

    _onSaveHandler() {

        const {history} = this.props;
        const customerData = this._customerData || {};

        if (!customerData['name']) {

            this._showWarningMessage();
            return;
        }

        this.props.asyncAddCustomer(customerData, history);
    }

    _onChangeDataHandler(data) {

        const currentCustomerData = this._customerData || {};

        this._customerData = { ...currentCustomerData, ...data };
    }

    _renderBody() {

        const {orgTypes = [], disabled = false} = this.props;

        return (
            <div className="order">
                <Header
                    disabled={disabled}
                    saveHandler={this._onSaveHandler.bind(this)}
                />
                <Details
                    disabled={disabled}
                    orgTypes={orgTypes}
                    onChangeState={this._onChangeDataHandler.bind(this)}
                />
            </div>
        );
    }

    render() {

        return this._renderBody();
    }

};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerModule);