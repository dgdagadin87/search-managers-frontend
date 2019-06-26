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
            dispatch({ type: actions['COMMON_SET_TITLE'], payload: 'Заказег Номер ' + orderId });
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