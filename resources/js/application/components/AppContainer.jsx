import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom';

import {connect} from 'react-redux';

import Header from './parts/Header';

import OrdersModule from './modules/orders/OrdersModule';
import OrderModule from './modules/order/OrderModule';
import CustomersModule from './modules/customers/CustomersModule';


const mapStateToProps = (state) => {
    return {
        commonData: state.commonData
    };
};

class AppContainer extends Component {

    render () {

        const {commonData: {userData = {}}} = this.props;

        return (
            <div className="main-container">
                <div className="main-center">
                    <Header user={userData} />
                    <div className="main-content">
                        <Switch>
                            <Route path="/customers" render={ (props) => <CustomersModule {...props} /> } />
                            <Route path="/orders/:id" render={ (props) => <OrderModule {...props} /> } />
                            <Route exact path="/" render={ (props) => <OrdersModule {...props} /> } />
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