import actions from '../../../config/actions';


const initialState = {
    disabled: false,
    collection: [],
    isLoading: false,
    customerData: {
        id: null,
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
        orgType: '48',
        isRegistered: false,
        regName: '',
        regPass: ''
    }
};

export default function (state = initialState, action) {

    switch (action.type) {

        case actions.CUSTOMER_SET_LOADING:
            return { ...state, isLoading: action.payload };

        case actions.CUSTOMER_SET_DATA:
                return { ...state, customerData: { ...state.customerData, ...action.payload} };
            
        case actions.CUSTOMER_SET_ALL_DATA:
            return { ...state, ...action.payload };

        case actions.CUSTOMER_SET_DEFAULT:
                return { ...initialState };

        case actions.CUSTOMER_SET_DISABLED:
            return { ...state, disabled: action.payload };

        default:
            return state;

    }
}