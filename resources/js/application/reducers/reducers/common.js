import actions from '../../../config/actions';

const initialState = {
    userData: {},
    orgTypes:[],
    managers: [],
    orderStates: [],
    orderSources: [],
    distribSources: [],
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
                distribSources = []
            } = action.payload;
            return {...state, userData: managerData, orgTypes, managers, orderStates, orderSources, distribSources};

        case actions.COMMON_SET_TITLE:
            document.title = 'Система оформления заказов - ' + action.payload;
            return {...state, title: action.payload};

        default:
            return state;

    }
}