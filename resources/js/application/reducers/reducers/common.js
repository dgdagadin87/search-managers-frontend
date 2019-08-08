import actions from '../../../config/actions';

const initialState = {
    userData: {},
    orgTypes:[],
    title: ''
};

export default function (state = initialState, action) {

    switch (action.type) {

        case actions.COMMON_SET_USER_DATA:
            const {managerData = {}, orgTypes = []} = action.payload;
            return {...state, userData: managerData, orgTypes};

        case actions.COMMON_SET_TITLE:
            document.title = 'Система оформления заказов - ' + action.payload;
            return {...state, title: action.payload};

        default:
            return state;

    }
}