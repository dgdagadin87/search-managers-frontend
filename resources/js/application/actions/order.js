import Message from 'antd/lib/message';

import actions from '../../config/actions';
import Request from '../../core/request';
import {createUrl} from '../../core/coreUtils';
import {defaultSettings, urlSettings} from '../../config/settings';

export const asyncGetOrder = (orderId) => {

    return dispatch => {

        dispatch({ type: actions['ORDER_SET_LOADING'], payload: true });
        dispatch({ type: actions['COMMON_SET_TITLE'], payload: 'Идёт загрузка данных...' });
        
        Request.send({
            url: `${createUrl(defaultSettings, urlSettings['order'])}/${orderId}`
        })
        .then( (data) => {

            dispatch({ type: actions['ORDER_SET_LOADING'], payload: false });
            dispatch({ type: actions['COMMON_SET_TITLE'], payload: 'Заказ №' + orderId });
            dispatch({ type: actions['ORDER_SET_DATA'], payload: data});
        })
        .catch((error) => {
            console.log('error', error);
            const {message, statusText} = error;
            const errorMessage = statusText ? statusText : message;
            alert(errorMessage);
        });
    }
};

export const asyncAddOrder = (dataToSend, history, showError) => {

    return dispatch => {

        dispatch({ type: actions['ADD_ORDER_SET_DISABLED'], payload: true });
        dispatch({ type: actions['COMMON_SET_TITLE'], payload: 'Идёт добавление заказа...' });

        Request.send({
            type: 'post',
            url: createUrl(defaultSettings, urlSettings['addOrder']),
            data: dataToSend,
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
        })
        .then( (data) => {

            const {isError = false, errorMessage = ''} = data;

            dispatch({ type: actions['ADD_ORDER_SET_DISABLED'], payload: false });

            if (isError) {
                showError(errorMessage);
                return;
            }
            
            dispatch({ type: actions['ORDERS_SET_DEFAULT'], payload: null });
            dispatch({ type: actions['ADD_ORDER_SET_DEFAULT'], payload: null });

            Message.success('Заказ успешно добавлен', 3);

            history.push('/');
        })
        .catch((error) => {
            dispatch({ type: actions['ADD_ORDER_SET_DISABLED'], payload: false });
            console.log('error', error);
            const {message, statusText} = error;
            const errorMessage = statusText ? statusText : message;
            alert(errorMessage);
        });
    }
};

export const asyncGetDistributors = (orderId) => {

    return dispatch => {

        dispatch({ type: actions['DIST_SET_LOADING'], payload: true });
        
        Request.send({
            url: createUrl(defaultSettings, urlSettings['getDistributors']),
            data: { orderId }
        })
        .then( (data) => {

            dispatch({ type: actions['DIST_SET_LOADING'], payload: false });
            dispatch({ type: actions['DIST_SET_DATA'], payload: data });
        })
        .catch((error) => {
            dispatch({ type: actions['DIST_SET_LOADING'], payload: false });
            console.log('error', error);
            const {message, statusText} = error;
            const errorMessage = statusText ? statusText : message;
            alert(errorMessage);
        });
    }
};

export const asyncDeleteDistributor = (id, orderId) => {

    return dispatch => {

        dispatch({ type: actions['DIST_SET_LOADING'], payload: true });

        Request.send({
            url: createUrl(defaultSettings, urlSettings['deleteDistributor']),
            data: { id }
        })
        .then( () => {

            return Request.send({
                url: createUrl(defaultSettings, urlSettings['getDistributors']),
                data: { orderId }
            })
        })
        .then( (data) => {

            dispatch({ type: actions['DIST_SET_LOADING'], payload: false });
            dispatch({ type: actions['DIST_SET_DATA'], payload: data });
        })
        .catch((error) => {
            dispatch({ type: actions['DIST_SET_LOADING'], payload: false });
            console.log('error', error);
            const {message, statusText} = error;
            const errorMessage = statusText ? statusText : message;
            alert(errorMessage);
        });
    }
};

export const asyncGetAOI = (orderId) => {

    return dispatch => {

        dispatch({ type: actions['AOI_SET_LOADING'], payload: true });
        
        Request.send({
            url: createUrl(defaultSettings, urlSettings['getAOI']),
            data: { orderId }
        })
        .then( (data) => {

            dispatch({ type: actions['AOI_SET_LOADING'], payload: false });
            dispatch({ type: actions['AOI_SET_DATA'], payload: data });
        })
        .catch((error) => {
            dispatch({ type: actions['AOI_SET_LOADING'], payload: false });
            console.log('error', error);
            const {message, statusText} = error;
            const errorMessage = statusText ? statusText : message;
            alert(errorMessage);
        });
    }
};

export const asyncDeleteAOI = (id, orderId) => {

    return dispatch => {

        dispatch({ type: actions['AOI_SET_LOADING'], payload: true });

        Request.send({
            url: createUrl(defaultSettings, urlSettings['deleteAOI']),
            data: { id }
        })
        .then( () => {

            return Request.send({
                url: createUrl(defaultSettings, urlSettings['getAOI']),
                data: { orderId }
            })
        })
        .then( (data) => {

            dispatch({ type: actions['AOI_SET_LOADING'], payload: false });
            dispatch({ type: actions['AOI_SET_DATA'], payload: data });
        })
        .catch((error) => {
            dispatch({ type: actions['AOI_SET_LOADING'], payload: false });
            console.log('error', error);
            const {message, statusText} = error;
            const errorMessage = statusText ? statusText : message;
            alert(errorMessage);
        });
    }
};

export const setAddOrderData = (data) => {
    return {
        type: actions.ADD_ORDER_SET_DATA,
        payload: data
    }
};