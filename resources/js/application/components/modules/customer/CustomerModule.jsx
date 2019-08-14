import React, {Component} from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {
    changeTitle
} from '../../../actions/common';
import {
    asyncGetCustomer,
    asyncSaveCustomer,
    setEditCustomerData
} from '../../../actions/customer';

import Header from '../addCustomer/header/Header';
import Details from '../addCustomer/details/Details';
import Grid from './grid/Grid';

import Spinner from '../../parts/Spinner';


const mapStateToProps = (state) => {
    return {
        disabled: state.customerData.disabled,
        isLoading: state.customerData.isLoading,
        collection: state.customerData.collection,
        customerData: state.customerData.customerData,
        orgTypes: state.commonData.orgTypes
    };
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        changeTitle,
        asyncGetCustomer,
        asyncSaveCustomer,
        setEditCustomerData
    }, dispatch);
}


class CustomerModule extends Component {

    componentDidMount() {

        const {match, asyncGetCustomer} = this.props;
        const {params} = match;
        const {id} = params;

        asyncGetCustomer(id);
    }

    _onSaveHandler() {

        const {customerData = {}} = this.props;

        this.props.asyncSaveCustomer(customerData);
    }

    _onChangeDataHandler(data) {

        const { setEditCustomerData, customerData = {} } = this.props;
        const correctCustomerData = { ...customerData, ...data }

        setEditCustomerData(correctCustomerData);
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