import React, {Component} from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {
    changeTitle
} from '../../../actions/common';
import {
    asyncGetCustomer,
    asyncSaveCustomer
} from '../../../actions/customer';

import Message from 'antd/lib/message';

import Header from './header/Header';
import Details from './details/Details';
import Grid from './grid/Grid';

import Spinner from '../../parts/Spinner';


const mapStateToProps = (state) => {
    return {
        disabled: state.customerData.disabled,
        isLoading: state.customerData.isLoading,
        collection: state.customerData.collection,
        customerData: state.customerData.customerData,
        orgTypes: state.customerData.orgTypes
    };
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        changeTitle,
        asyncGetCustomer,
        asyncSaveCustomer
    }, dispatch);
}


class CustomerModule extends Component {

    constructor(...props){

        super(...props);

        this._customerData = props['customerData'] || {};
    }

    _showWarningMessage () {

        Message.error('Заполните поле "ФИО Заказчика"');
    };

    UNSAFE_componentWillReceiveProps(newProps) {

        const {customerData = {}} = newProps;

        if (customerData.hasOwnProperty('id')) {

            this._customerData = customerData;
        }
    }

    componentDidMount() {

        const {match, asyncGetCustomer} = this.props;
        const {params} = match;
        const {id} = params;

        asyncGetCustomer(id);
    }

    _onSaveHandler() {

        const customerData = this._customerData || {};

        if (!customerData['name']) {

            this._showWarningMessage();
            return;
        }

        this.props.asyncSaveCustomer(customerData);
    }

    _onChangeDataHandler(data) {

        const currentCustomerData = this._customerData || {};

        this._customerData = { ...currentCustomerData, ...data };
    }

    _renderBody() {

        const {match, collection = [], customerData = {}, orgTypes = [], disabled = false} = this.props;
        const {params} = match;
        const {id} = params;

        return (
            <div className="order">
                <Header
                    disabled={disabled}
                    customerData={customerData}
                    saveHandler={this._onSaveHandler.bind(this)}
                />
                <Details
                    disabled={disabled}
                    orgTypes={orgTypes}
                    customerData={customerData}
                    onChangeState={this._onChangeDataHandler.bind(this)}
                />
                <Grid
                    customerId={id}
                    collection={collection}
                    customerData={customerData}
                />
            </div>
        );
    }

    render() {

        const { isLoading } = this.props;

        return isLoading ? <Spinner /> : this._renderBody();
    }

};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerModule);