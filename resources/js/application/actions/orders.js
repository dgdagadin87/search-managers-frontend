import actions from '../../config/actions';
import Request from '../../core/request';
import {createUrl} from '../../core/coreUtils';
import {defaultSettings, urlSettings} from '../../config/settings';

export const asyncGetOrders = (sort = {}, filter = {}, paging = {}) => {

    return dispatch => {

        const formatDateForSend = dateValue => {
            if (!dateValue){
                return null;
            }
            
            return dateValue['year'] + '-' + (parseInt(dateValue['month'], 10) > 9 ? dateValue['month'] : '0' + dateValue['month']) + '-' + (parseInt(dateValue['day'], 10) > 9 ? dateValue['day'] : '0' + dateValue['day']);
        };

        const formatDateAfterSend = value => {

            if (!value) {
                return null;
            }
        
            if (typeof value !== 'string') {
                return value;
            }
        
            const valueArray = value.split('-');
        
            return {
                day: parseInt(valueArray[2]),
                month: parseInt(valueArray[1]),
                year: parseInt(valueArray[0])
            };
        }

        const {sortBy, sortType} = sort;
        const {
            searchString = '',
            onlyActive = false,
            stateId = '',
            sourceId = '',
            managerId = '',
            dateFrom = null,
            dateTo = null
        } = filter;
        const {page = 1} = paging;

        dispatch({ type: actions['ORDERS_SET_LOADING'], payload: true });
        dispatch({ type: actions['COMMON_SET_TITLE'], payload: 'Идёт загрузка данных...' });

        Request.send({
            url: createUrl(defaultSettings, urlSettings['orders']),
            data: {
                sortBy,
                sortType,
                page,
                searchString,
                onlyActive,
                stateId,
                sourceId,
                managerId,
                dateFrom: formatDateForSend(dateFrom),
                dateTo: formatDateForSend(dateTo)
            }
        })
        .then( (response) => {

            const {collection = [], order = {}, paging = {}, filter = {}} = response;
            const { dateFrom = null, dateTo = null } = filter;
            const correctFilter = {
                ...filter,
                dateFrom: formatDateAfterSend(dateFrom),
                dateTo: formatDateAfterSend(dateTo)
            };

            dispatch({ type: actions['ORDERS_SET_LOADING'], payload: false });
            dispatch({ type: actions['COMMON_SET_TITLE'], payload: 'Заказы' });
            dispatch({ type: actions['ORDERS_SET_DATA'], payload: { collection, order, paging, filter: correctFilter }});
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

export const changeOnlyActive = (value) => {
    return {
        type: actions.ORDERS_SET_ONLY_ACTIVE,
        payload: value
    }
};

export const changeStateId = (value) => {
    return {
        type: actions.ORDERS_SET_STATE_ID,
        payload: value
    }
};

export const changeSourceId = (value) => {
    return {
        type: actions.ORDERS_SET_SOURCE_ID,
        payload: value
    }
};

export const changeManagerId = (value) => {
    return {
        type: actions.ORDERS_SET_MANAGER_ID,
        payload: value
    }
};