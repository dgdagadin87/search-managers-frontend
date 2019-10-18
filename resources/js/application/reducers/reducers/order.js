import actions from '../../../config/actions';
import { formatRawDate } from '../../../core/coreUtils';

import {NETWORK_PATH} from '../../../config/settings';


const correctCreateDate = formatRawDate(new Date());

const initialState = {
    disabled: false,
    isLoading: false,
    orderData: {
        id: null,
        name: '',
        comment: '',
        request: '',
        xstatus: '',
        managerId: undefined,
        stateId: undefined,
        sourceId: undefined,
        client: {},
        theme: '',
        contractNumber: '',
        accountNumber: '',
        valueAddedTax: null,
        contactAmount: null,
        createDate: correctCreateDate,
        completeDate: null,
        contractDate: null,
        paymentDate: null,
        actDate: null,
        dirPath: null,
        dirPathShort: null
    }
};

export default function (state = initialState, action) {

    switch (action.type) {

        case actions.ORDER_SET_DATA:

            const { orderData = {} } = action['payload'];

            return { ...state, orderData };

        case actions.ORDER_SET_FORM_DATA:
            return { ...state, orderData: { ...state.orderData, ...action.payload} };

        case actions.ORDER_SET_LOADING:
            return { ...state, isLoading: action.payload };

        case actions.ORDER_SET_DISABLED:
            return { ...state, disabled: action.payload };
        
        /*case actions.AOI_SET_LOADING:
            return { ...state, isAoiLoading: action.payload };

        case actions.DIST_SET_DATA:
            return { ...state, distributors: action.payload };*/

        case actions.ORDERS_UPDATE_ROW:
            return { ...state, orderData: updateOrderData(state['orderData']) };

        default:
            return state;
    }
}

const updateOrderData = (orderData) => {

    const {client = {}, id:orderId} = orderData;
    const {id:clientId} = client;

    const dirPath = NETWORK_PATH + '\\orders\\Client_' + clientId + '\\Order_' + orderId;
    const dirPathShort = '\\orders\\Client_' + clientId + '\\Order_' + orderId;

    return { ...orderData, dirPath, dirPathShort };
};