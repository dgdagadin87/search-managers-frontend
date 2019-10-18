import actions from '../../../config/actions';


const initialState = {
    collection: false,
    searchString: '',
    stateId: undefined,
    sourceId: undefined,
    managerId: undefined,
    dateFrom: null,
    dateTo: null,
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
            return { ...state, collection, ...filter, ...paging, sortBy: order['field'], sortType: order['mode'] };

        case actions.ORDERS_SET_SEARCH:
            return { ...state, searchString: action.payload };

        case actions.ORDERS_SET_ONLY_ACTIVE:
            return { ...state, onlyActive: action.payload };

        case actions.ORDERS_SET_STATE_ID:
            return { ...state, stateId: action.payload };

        case actions.ORDERS_SET_SOURCE_ID:
            return { ...state, sourceId: action.payload };

        case actions.ORDERS_SET_MANAGER_ID:
            return { ...state, managerId: action.payload };

        case actions.ORDERS_SET_LOADING:
            return { ...state, isLoading: action.payload };

        case actions.ORDERS_SET_DEFAULT:
            return { ...state, collection: false, page: 1 };

        case actions.ORDERS_UPDATE_ROW:
            return { ...state, collection: false };

        default:
            return state;

    }
}