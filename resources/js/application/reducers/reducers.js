import {combineReducers} from 'redux';
import { connectRouter } from 'connected-react-router'

import common from './reducers/common';
import orders from './reducers/orders';
import order from './reducers/order';
import addOrder from './reducers/addOrder';
import customers from './reducers/customers';
import customer from './reducers/customer';
import addCustomer from './reducers/addCustomer';

import history from '../../service/history';

const allReducers = combineReducers({
    router: connectRouter(history),
    commonData: common,
    ordersData: orders,
    orderData: order,
    addOrderData: addOrder,
    customersData: customers,
    customerData: customer,
    addCustomerData: addCustomer
});

export default allReducers;