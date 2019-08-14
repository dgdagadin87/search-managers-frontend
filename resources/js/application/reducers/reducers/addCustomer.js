import actions from '../../../config/actions';


const initialState = {
    disabled: false,
    customerData: {
        requisites: '',
        remarks: '',
        name: '',
        address: '',
        agent: '',
        email: '',
        email2: '',
        fax: '',
        phone: '',
        mobilePhone: '',
        position: '',
        homePage: '',
        orgType: '48'
    }
};

export default function (state = initialState, action) {

    switch (action.type) {

        case actions.ADD_CUSTOMER_SET_DATA:
            return { ...state, customerData: { ...state.customerData, ...action.payload} };

        case actions.ADD_CUSTOMER_SET_DEFAULT:
            return { ...initialState };

        case actions.ADD_CUSTOMER_SET_DISABLED:
            return { ...state, disabled: action.payload };

        default:
            return state;

    }
}