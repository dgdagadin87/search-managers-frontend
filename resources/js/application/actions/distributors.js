import actions from '../../config/actions';
import Request from '../../core/request';
import {createUrl} from '../../core/coreUtils';
import {defaultSettings, urlSettings} from '../../config/settings';


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

export const asyncSaveDistributor = (orderId, formData) => {

    return dispatch => {

        const {
            account = '',
            code = '',
            distDate = null,
            number = '',
            price = null,
            square = null,
            source = null,
            id = false
        } = formData;

        const dataToSend = {
            distDate,
            account,
            code,
            number,
            price,
            square,
            source,
            orderId
        };

        if (id !== false) {
            dataToSend['id'] = id;
        }

        dispatch({ type: actions['DIST_SET_DISABLED'], payload: true });

        Request.send({
            type: 'post',
            url: createUrl(defaultSettings, urlSettings[(id !== false ? 'edit' : 'add') + 'Distributor']),
            data: dataToSend,
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
        })
        .then( () => {

            dispatch({ type: actions['DIST_SET_DISABLED'], payload: false });
            dispatch({ type: actions['DIST_SET_LOADING'], payload: true });
            dispatch({ type: actions['DIST_SET_DIFFERENT_DATA'], payload: { visible: false } });

            return Request.send({
                url: createUrl(defaultSettings, urlSettings['getDistributors']),
                data: { orderId }
            });
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
}

export const setDistributorData = (data) => {
    return {
        type: actions.DIST_SET_DIFFERENT_DATA,
        payload: data
    }
};