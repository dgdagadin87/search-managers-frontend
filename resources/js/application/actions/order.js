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
            console.log('error', error);
            const {message, statusText} = error;
            const errorMessage = statusText ? statusText : message;
            alert(errorMessage);
        });
    }
};