import actions from '../../config/actions';
import Request from '../../core/request';
import {createUrl} from '../../core/coreUtils';
import {defaultSettings, urlSettings} from '../../config/settings';

export const asyncGetOrders = (sort = {}, filter = {}, paging = {}) => {

    return dispatch => {

        const {sortBy, sortType} = sort;
        const {searchString = '', onlyMy = false, onlyActive = false} = filter;
        const {page = 1} = paging;

        dispatch({ type: actions['ORDERS_SET_LOADING'], payload: true });
        dispatch({ type: actions['COMMON_SET_TITLE'], payload: 'Идёт загрузка данных...' });
        

        Request.send({
            url: createUrl(defaultSettings, urlSettings['orders']),
            data: { sortBy, sortType, page, searchString, onlyMy, onlyActive }
        })
        .then( (response) => {

            const {collection = [], order = {}, paging = {}, filter = {}} = response;

            dispatch({ type: actions['ORDERS_SET_LOADING'], payload: false });
            dispatch({ type: actions['COMMON_SET_TITLE'], payload: 'Заказы' });
            dispatch({ type: actions['ORDERS_SET_DATA'], payload: { collection, order, paging, filter }});
        })
        .catch((error) => {
            console.log('error', error);
            const {message, statusText} = error;
            const errorMessage = statusText ? statusText : message;
            alert(errorMessage);
        });
    }
};

export const changeSearch = (value) => {
    return {
        type: actions.ORDERS_SET_SEARCH,
        payload: value
    }
};

export const changeOnlyMy = (value) => {
    return {
        type: actions.ORDERS_SET_ONLY_MY,
        payload: value
    }
};

export const changeOnlyActive = (value) => {
    return {
        type: actions.ORDERS_SET_ONLY_ACTIVE,
        payload: value
    }
};