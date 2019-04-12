import actions from '../../../config/actions';


const initialState = {
    collection: false,
    searchString: '',
    onlyMy: false,
    onlyActive: false,
    page: 1,
    pages: 1,
    count: 0,
    sortBy: false,
    sortType: false,
    isLoading: false
};

export default function (state = initialState, action) {

    switch (action.type) {

        case actions.ORDERS_SET_DATA:
            const {collection = [], filter = {}, order = {}, paging = {}} = action['payload'];
            return { ...state, collection, ...filter, ...order, ...paging };

        case actions.ORDERS_SET_SEARCH:
            return { ...state, searchString: action.payload };

        case actions.ORDERS_SET_ONLY_MY:
            return { ...state, onlyMy: action.payload };

        case actions.ORDERS_SET_ONLY_ACTIVE:
            return { ...state, onlyActive: action.payload };

        case actions.ORDERS_SET_LOADING:
            return { ...state, isLoading: action.payload };

        default:
            return state;

    }
}