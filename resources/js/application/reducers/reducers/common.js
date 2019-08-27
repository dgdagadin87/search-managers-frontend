import actions from '../../../config/actions';

const initialState = {
    userData: {},
    orgTypes:[],
    managers: [],
    orderStates: [],
    orderSources: [],
    distribSources: [],
    applications: [],
    title: ''
};

export default function (state = initialState, action) {

    switch (action.type) {

        case actions.COMMON_SET_USER_DATA:
            const {
                managerData = {},
                orgTypes = [],
                managers = [],
                orderStates = [],
                orderSources = [],
                distribSources = [],
                applications = []
            } = action.payload;
            return {
                ...state,
                orgTypes,
                managers,
                orderStates,
                orderSources,
                distribSources,
                applications,
                userData: managerData
            };

        case actions.COMMON_SET_TITLE:
            document.title = 'Система оформления заказов - ' + action.payload;
            return {...state, title: action.payload};

        default:
            return state;

    }
}