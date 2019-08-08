import actions from '../../../config/actions';


const initialState = {

    isLoading: false,
    isDistLoading: false,
    isAoiLoading: false,
    orderData: {},
    aoi: [],
    clients: [],
    managers: [],
    orderStates: [],
    orderSources: [],
    distribSources: []
};

export default function (state = initialState, action) {

    switch (action.type) {

        case actions.ORDER_SET_DATA:

            const {
                orderData = {},
                clients = [],
                managers = [],
                aoi = [],
                scenes = [],
                distributors = [],
                orderStates = [],
                orderSources = [],
                distribSources = []
            } = action['payload'];

            return {
                ...state,
                orderData,
                clients,
                managers,
                aoi,
                scenes,
                distributors,
                orderStates,
                orderSources,
                distribSources
            };

        case actions.ORDER_SET_LOADING:
            return { ...state, isLoading: action.payload };

        case actions.DIST_SET_LOADING:
            return { ...state, isDistLoading: action.payload };
        
        case actions.AOI_SET_LOADING:
                return { ...state, isAoiLoading: action.payload };

        case actions.DIST_SET_DATA:
            return { ...state, distributors: action.payload };

        case actions.AOI_SET_DATA:
                return { ...state, aoi: action.payload };

        default:
            return state;

    }
}