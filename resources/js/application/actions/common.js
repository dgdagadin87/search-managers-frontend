import actions from '../../config/actions';

export const changeTitle = (title) => {
    return {
        type: actions.COMMON_SET_TITLE,
        payload: title
    }
};