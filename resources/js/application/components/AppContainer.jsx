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
import ReportsModule from './modules/reports/Reports';
import LayersModule from './modules/layers/Layers';
import LinksModule from './modules/links/Links';
import AddLinkModule from './modules/addLink/AddLink';
import AddLayerModule from './modules/addLayer/addLayer';


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
                            <Route exact path="/reports" render={ (props) => <ReportsModule {...props} globalEvents={globalEvents} /> } />
                            <Route path="/layers">
                                <Switch>
                                    <Route path="/layers/add" render={ (props) => <AddLayerModule {...props} globalEvents={globalEvents} /> } />
                                    <Route exact path="/layers" render={ (props) => <LayersModule {...props} globalEvents={globalEvents} /> } />
                                </Switch>
                            </Route>
                            <Route path="/links">
                                <Switch>
                                    <Route path="/links/add" render={ (props) => <AddLinkModule {...props} globalEvents={globalEvents} /> } />
                                    <Route exact path="/links" render={ (props) => <LinksModule {...props} globalEvents={globalEvents} /> } />
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