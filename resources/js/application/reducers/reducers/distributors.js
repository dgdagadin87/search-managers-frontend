import actions from '../../../config/actions';

const initialState = {
    isLoading: false,
    visible: false,
    disabled: false,
    distributorsData: {
        account: '',
        code: '',
        distDate: null,
        number: '',
        price: null,
        square: null,
        source: null,
        id: false
    },
    distributors: []
};

export default function (state = initialState, action) {

    switch (action.type) {

        case actions.ORDER_SET_DATA:
            const { distributors = [] } = action['payload'];
            return { ...state, distributors };
        
        case actions.DIST_SET_LOADING:
            return { ...state, isLoading: action.payload };

        case actions.DIST_SET_DISABLED:
            return { ...state, disabled: action.payload };

        case actions.DIST_SET_DATA:
            return { ...state, distributors: action.payload };

        case actions.DIST_SET_DIFFERENT_DATA:
            return { ...state, ...action.payload };

        default:
            return state;

    }
}