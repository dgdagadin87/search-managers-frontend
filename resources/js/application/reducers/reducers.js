import {combineReducers} from 'redux';
import { connectRouter } from 'connected-react-router'

import common from './reducers/common';
import orders from './reducers/orders';
import order from './reducers/order';
import customers from './reducers/customers';
import customer from './reducers/customer';

import history from '../../service/history';

const allReducers = combineReducers({
    router: connectRouter(history),
    commonData: common,
    ordersData: orders,
    orderData: order,
    customersData: customers,
    customerData: customer
});

export default allReducers;