import React, {Component, Fragment} from 'react';

import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {
    changeTitle
} from '../../../actions/common';
import {
    asyncGetCustomer,
    asyncSaveCustomer,
    asyncRegisterUser,
    setEditCustomerData
} from '../../../actions/customer';

import {
    addOrderForCustomer
} from '../../../actions/order';

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
        asyncRegisterUser,
        setEditCustomerData,
        addOrderForCustomer
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

    _onAddOrderHandler(customerData, history) {

        const {globalEvents} = this.props;

        this.props.addOrderForCustomer(customerData, history, globalEvents);
    }

    _onChangeDataHandler(data) {

        const { setEditCustomerData, customerData = {} } = this.props;
        const correctCustomerData = { ...customerData, ...data }

        setEditCustomerData(correctCustomerData);
    }

    _onRegisterHandler() {

        const { asyncRegisterUser, customerData:{id = false, email = ''}} = this.props;

        asyncRegisterUser({ id, email });
    }

    _renderBody() {

        const {match, collection = [], customerData = {}, orgTypes = [], disabled = false, history} = this.props;
        const {params} = match;
        const {id} = params;

        return (
            <Fragment>
                <Header
                    history={history}
                    disabled={disabled}
                    customerData={customerData}
                    saveHandler={this._onSaveHandler.bind(this)}
                    addOrderHandler={this._onAddOrderHandler.bind(this)}
                />
                <Details
                    disabled={disabled}
                    orgTypes={orgTypes}
                    customerData={customerData}
                    onChangeState={this._onChangeDataHandler.bind(this)}
                    onRegister={this._onRegisterHandler.bind(this)}
                />
                <Grid
                    customerId={id}
                    collection={collection}
                    customerData={customerData}
                    globalEvents={this.props.globalEvents}
                />
            </Fragment>
        );
    }

    render() {

        const { isLoading } = this.props;

        return isLoading ? <Spinner /> : this._renderBody();
    }

};

CustomerModule.propTypes = {
    disabled: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    collection: PropTypes.array.isRequired,
    customerData: PropTypes.object.isRequired,
    orgTypes: PropTypes.array.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerModule);