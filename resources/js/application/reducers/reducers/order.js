import actions from '../../../config/actions';


const initialState = {

    isLoading: false,
    orderData: {},
    clients: [],
    managers: [],
    orderStates: [],
    orderSources: []
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
                orderSources = []
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
                orderSources
            };

        case actions.ORDER_SET_LOADING:
            return { ...state, isLoading: action.payload };

        default:
            return state;

    }
}