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

export const asyncEditOrder = (dataToSend, showError) => {

    return dispatch => {

        dispatch({ type: actions['ORDER_SET_DISABLED'], payload: true });
        dispatch({ type: actions['COMMON_SET_TITLE'], payload: 'Идёт редактирование заказа...' });

        Request.send({
            type: 'post',
            url: createUrl(defaultSettings, urlSettings['editOrder']),
            data: dataToSend,
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
        })
        .then( (data) => {

            const {isError = false, errorMessage = ''} = data;

            dispatch({ type: actions['ORDER_SET_DISABLED'], payload: false });

            if (isError) {
                showError(errorMessage);
                return;
            }

            dispatch({ type: actions['ORDERS_SET_DEFAULT'], payload: null }); // TODO

            Message.success('Заказ успешно отредактирован', 3);
        })
        .catch((error) => {
            dispatch({ type: actions['ORDER_SET_DISABLED'], payload: false });
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

export const setEditOrderData = (data) => {
    return {
        type: actions.ORDER_SET_FORM_DATA,
        payload: data
    }
};