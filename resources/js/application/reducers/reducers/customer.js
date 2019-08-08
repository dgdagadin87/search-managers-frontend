import actions from '../../../config/actions';


const initialState = {
    disabled: false,
    customerData: {},
    orgTypes: [],
    collection: [],
    isLoading: false
};

export default function (state = initialState, action) {

    switch (action.type) {

        case actions.CUSTOMER_SET_LOADING:
            return { ...state, isLoading: action.payload };

        case actions.CUSTOMER_SET_DATA:
            return { ...state, ...action.payload };

        case actions.CUSTOMER_SET_DISABLED:
            return { ...state, disabled: action.payload };

        default:
            return state;

    }
}