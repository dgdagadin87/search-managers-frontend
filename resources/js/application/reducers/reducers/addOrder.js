import actions from '../../../config/actions';
import { formatRawDate } from '../../../core/coreUtils';


const correctCreateDate = formatRawDate(new Date());

const initialState = {
    disabled: false,
    orderData: {
        name: '',
        comment: '',
        manager: undefined,
        state: undefined,
        source: undefined,
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
        actDate: null
    }
};

export default function (state = initialState, action) {

    switch (action.type) {

        case actions.ADD_ORDER_SET_DISABLED:
            return { ...state, disabled: action.payload };

        case actions.ADD_ORDER_SET_DATA:
            return { ...state, orderData: { ...state.orderData, ...action.payload} };
    
        case actions.ADD_ORDER_SET_DEFAULT:
            return { ...initialState };

        default:
            return state;

    }
}