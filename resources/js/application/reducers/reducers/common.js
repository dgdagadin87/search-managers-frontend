import actions from '../../../config/actions';

const initialState = {
    userData: {},
    title: ''
};

export default function (state = initialState, action) {

    switch (action.type) {

        case actions.COMMON_SET_USER_DATA:
            return {...state, userData: action.payload};

        case actions.COMMON_SET_TITLE:
            document.title = 'Система оформления заказов - ' + action.payload;
            return {...state, title: action.payload};

        default:
            return state;

    }
}