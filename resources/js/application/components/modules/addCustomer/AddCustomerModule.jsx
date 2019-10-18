import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {
    changeTitle
} from '../../../actions/common';
import {
    asyncAddCustomer,
    setAddCustomerData
} from '../../../actions/customer';

import Header from './header/Header';
import Details from './details/Details';


const mapStateToProps = (state) => {
    return {
        customerData: state.addCustomerData.customerData,
        disabled: state.addCustomerData.disabled,
        orgTypes: state.commonData.orgTypes
    };
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        changeTitle,
        setAddCustomerData,
        asyncAddCustomer
    }, dispatch);
}


class AddCustomerModule extends Component {

    constructor(...props){

        super(...props);
    }

    componentDidMount() {

        const {changeTitle} = this.props;

        changeTitle('Добавление заказчика');
    }

    _onSaveHandler() {

        const {history, customerData = {}} = this.props;

        this.props.asyncAddCustomer(customerData, history);
    }

    _onChangeDataHandler(data) {

        const { setAddCustomerData, customerData = {} } = this.props;
        const correctCustomerData = { ...customerData, ...data }

        setAddCustomerData(correctCustomerData);
    }

    _renderBody() {

        const {orgTypes = [], disabled = false, customerData = {}} = this.props;

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
            </div>
        );
    }

    render() {

        return this._renderBody();
    }

};

AddCustomerModule.propTypes = {
    disabled: PropTypes.bool.isRequired,
    customerData: PropTypes.object.isRequired,
    saveHandler: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCustomerModule);