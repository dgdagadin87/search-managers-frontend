import actions from '../../../config/actions';


const initialState = {
    collection: false,
    searchString: '',
    page: 1,
    pages: 1,
    count: 0,
    sortBy: false,
    sortType: false,
    isLoading: false
};

export default function (state = initialState, action) {

    switch (action.type) {

        case actions.CUSTOMERS_SET_DATA:
            const {collection = [], filter = {}, order = {}, paging = {}} = action['payload'];
            return { ...state, collection, ...filter, ...order, ...paging };

        case actions.CUSTOMERS_SET_SEARCH:
            return { ...state, searchString: action.payload };

        case actions.CUSTOMERS_SET_LOADING:
            return { ...state, isLoading: action.payload };

        case actions.CUSTOMERS_SET_DEFAULT:
            return { ...initialState };

        default:
            return state;

    }
}