import actions from '../../config/actions';
import Request from '../../core/request';
import {createUrl} from '../../core/coreUtils';
import {defaultSettings, urlSettings} from '../../config/settings';

export const asyncGetCustomers = (sort = {}, filter = {}, paging = {}) => {

    return dispatch => {

        const {sortBy, sortType} = sort;
        const {searchString = '', orgString = ''} = filter;
        const {page = 1} = paging;

        dispatch({ type: actions['CUSTOMERS_SET_LOADING'], payload: true });
        dispatch({ type: actions['COMMON_SET_TITLE'], payload: 'Идёт загрузка данных...' });

        Request.send({
            url: createUrl(defaultSettings, urlSettings['customers']),
            data: { sortBy, sortType, page, searchString, orgString }
        })
        .then( (response) => {

            const {collection = [], order = {}, paging = {}, filter = {}} = response;

            dispatch({ type: actions['CUSTOMERS_SET_LOADING'], payload: false });
            dispatch({ type: actions['COMMON_SET_TITLE'], payload: 'Заказчики' });
            dispatch({ type: actions['CUSTOMERS_SET_DATA'], payload: { collection, order, paging, filter }});
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
        type: actions.CUSTOMERS_SET_SEARCH,
        payload: value
    }
};

export const changeOrg = (value) => {
    return {
        type: actions.CUSTOMERS_SET_ORG,
        payload: value
    }
};