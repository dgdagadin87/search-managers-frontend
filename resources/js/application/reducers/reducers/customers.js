import actions from '../../../config/actions';


const initialState = {
    collection: false,
    searchString: '',
    orgString: '',
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
            return { ...state, collection, ...filter, sortBy: order['field'], sortType: order['mode'], ...paging };

        case actions.CUSTOMERS_SET_SEARCH:
            return { ...state, searchString: action.payload };

        case actions.CUSTOMERS_SET_ORG:
            return { ...state, orgString: action.payload };

        case actions.CUSTOMERS_SET_LOADING:
            return { ...state, isLoading: action.payload };

        case actions.CUSTOMERS_SET_DEFAULT:
            return { ...state, collection: false, page: 1 };

        case actions.CUSTOMERS_UPDATE_ROW:
            return { ...state, collection: false };

        default:
            return state;

    }
}