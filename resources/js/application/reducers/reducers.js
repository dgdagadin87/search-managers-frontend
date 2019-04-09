import {combineReducers} from 'redux';
import { connectRouter } from 'connected-react-router'

import common from './reducers/common';

import history from '../../service/history';

const allReducers = combineReducers({
    router: connectRouter(history),
    commonData: common
});

export default allReducers;