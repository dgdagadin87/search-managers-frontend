import {combineReducers} from 'redux';
import { connectRouter } from 'connected-react-router'

import common from './reducers/common';
import orders from './reducers/orders';

import history from '../../service/history';

const allReducers = combineReducers({
    router: connectRouter(history),
    commonData: common,
    ordersData: orders
});

export default allReducers;