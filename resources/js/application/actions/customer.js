import actions from '../../config/actions';
import Request from '../../core/request';
import {createUrl} from '../../core/coreUtils';
import {defaultSettings, urlSettings} from '../../config/settings';

import Message from 'antd/lib/message';


export const asyncGetCustomer = (customerId) => {

    return dispatch => {

        dispatch({ type: actions['CUSTOMER_SET_LOADING'], payload: true });
        dispatch({ type: actions['COMMON_SET_TITLE'], payload: 'Идёт загрузка данных...' });
        
        Request.send({
            url: createUrl(defaultSettings, urlSettings['customer']),
            data: { customerId }
        })
        .then( (data) => {

            const { collection = [], customerData = {} } = data;
            const {name = ''} = customerData;

            dispatch({ type: actions['CUSTOMER_SET_LOADING'], payload: false });
            dispatch({ type: actions['COMMON_SET_TITLE'], payload: 'Заказчик ' + name });
            dispatch({ type: actions['CUSTOMER_SET_ALL_DATA'], payload: { collection, customerData }});
        })
        .catch((error) => {
            dispatch({ type: actions['CUSTOMER_SET_LOADING'], payload: false });
            console.log('error', error);
            const {message, statusText} = error;
            const errorMessage = statusText ? statusText : message;
            alert(errorMessage);
        });
    }
};

export const asyncSaveCustomer = (dataToSend) => {

    return dispatch => {

        dispatch({ type: actions['CUSTOMER_SET_DATA'], payload: { customerData: dataToSend } });
        dispatch({ type: actions['CUSTOMER_SET_DISABLED'], payload: true });

        Request.send({
            type: 'post',
            url: createUrl(defaultSettings, urlSettings['editCustomer']),
            data: dataToSend,
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
        })
        .then( () => {

            dispatch({ type: actions['CUSTOMER_SET_DISABLED'], payload: false });
            dispatch({ type: actions['CUSTOMERS_SET_DEFAULT'], payload: false }); // !! TODO !!
            
            hide();

            Message.success('Пользователь успешно сохранен', 3);
        })
        .catch((error) => {
            dispatch({ type: actions['CUSTOMER_SET_DISABLED'], payload: false });
            console.log('error', error);
            const {message, statusText} = error;
            const errorMessage = statusText ? statusText : message;
            alert(errorMessage);
        });
    }
};

export const asyncAddCustomer = (dataToSend, history) => {

    return dispatch => {

        dispatch({ type: actions['CUSTOMER_SET_DISABLED'], payload: true });

        Request.send({
            type: 'post',
            url: createUrl(defaultSettings, urlSettings['addCustomer']),
            data: dataToSend,
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
        })
        .then( () => {

            dispatch({ type: actions['CUSTOMER_SET_DISABLED'], payload: false });
            dispatch({ type: actions['CUSTOMERS_SET_DEFAULT'], payload: null });
            dispatch({ type: actions['ADD_CUSTOMER_SET_DEFAULT'], payload: null });

            Message.success('Пользователь успешно добавлен', 3);

            history.push('/customers');
        })
        .catch((error) => {
            dispatch({ type: actions['CUSTOMER_SET_DISABLED'], payload: false });
            console.log('error', error);
            const {message, statusText} = error;
            const errorMessage = statusText ? statusText : message;
            alert(errorMessage);
        });
    }
};

export const setEditCustomerData = (data) => {
    return {
        type: actions.CUSTOMER_SET_DATA,
        payload: data
    }
};

export const setAddCustomerData = (data) => {
    return {
        type: actions.ADD_CUSTOMER_SET_DATA,
        payload: data
    }
};