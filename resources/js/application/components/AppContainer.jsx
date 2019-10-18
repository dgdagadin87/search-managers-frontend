import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom';

import {connect} from 'react-redux';

import Header from './parts/Header';

import Events from '../../core/events';

import OrdersModule from './modules/orders/OrdersModule';
import OrderModule from './modules/editOrder/OrderModule';
import AddOrderModule from './modules/addOrder/AddOrderModule';
import CustomersModule from './modules/customers/CustomersModule';
import CustomerModule from './modules/customer/CustomerModule';
import AddCustomerModule from './modules/addCustomer/AddCustomerModule';


const mapStateToProps = (state) => {
    return {
        commonData: state.commonData
    };
};

const globalEvents = new Events();

class AppContainer extends Component {

    render () {

        const {commonData: {userData = {}}} = this.props;

        return (
            <div className="main-container">
                <div className="main-center">
                    <Header user={userData} globalEvents={globalEvents} />
                    <div className="main-content">
                        <Switch>
                            <Route path="/customers">
                                <Switch>
                                    <Route path="/customers/edit/:id" render={ (props) => <CustomerModule {...props} globalEvents={globalEvents} /> } />
                                    <Route path="/customers/addcustomer" render={ (props) => <AddCustomerModule {...props} globalEvents={globalEvents} /> } />
                                    <Route exact path="/customers" render={ (props) => <CustomersModule {...props} globalEvents={globalEvents} /> } />
                                </Switch>
                            </Route>
                            <Route path="/orders">
                                <Switch>
                                    <Route path="/orders/edit/:id" render={ (props) => <OrderModule {...props} globalEvents={globalEvents} /> } />
                                    <Route path="/orders/addorder" render={ (props) => <AddOrderModule {...props} globalEvents={globalEvents} /> } />
                                    <Route exact path="/orders" render={ (props) => <OrdersModule {...props} globalEvents={globalEvents} /> } />
                                </Switch>
                            </Route>
                            <Route exact path="/" render={ (props) => <OrdersModule {...props} globalEvents={globalEvents} /> } />
                        </Switch>
                    </div>
                </div>
                <div className="main-footer">
                    Footer
                </div>
            </div>
        );
    }
}
export default connect(mapStateToProps)(AppContainer);