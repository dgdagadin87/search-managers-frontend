import actions from '../../../config/actions';


const initialState = {

    isLoading: false,
    orderData: {},
    clients: [],
    managers: []
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
                distributors = []
            } = action['payload'];

            return { ...state, orderData, clients, managers, aoi, scenes, distributors };

        case actions.ORDER_SET_LOADING:
            return { ...state, isLoading: action.payload };

        default:
            return state;

    }
}