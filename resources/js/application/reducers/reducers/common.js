import actions from '../../../config/actions';

const initialState = {
    userData: {},
    sitesData: [],
    errors: [],
    title: '4stor - Страшные истории - начало'
};

export default function (state = initialState, action) {

    switch (action.type) {

        case actions.COMMON_SET_USER_DATA:
            return {...state, userData: action.payload};

        default:
            return state;

    }
}