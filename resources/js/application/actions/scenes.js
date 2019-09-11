import actions from '../../config/actions';
import Request from '../../core/request';
import {createUrl} from '../../core/coreUtils';
import {defaultSettings, urlSettings} from '../../config/settings';

export const asyncGetScenes = (orderId) => {

    return dispatch => {

        dispatch({ type: actions['SCENES_SET_LOADING'], payload: true });
        
        Request.send({
            url: createUrl(defaultSettings, urlSettings['getScenes']),
            data: { orderId }
        })
        .then( (data) => {

            dispatch({ type: actions['SCENES_SET_LOADING'], payload: false });
            dispatch({ type: actions['SCENES_SET_DATA'], payload: data });
        })
        .catch((error) => {
            dispatch({ type: actions['SCENES_SET_LOADING'], payload: false });
            console.log('error', error);
            const {message, statusText} = error;
            const errorMessage = statusText ? statusText : message;
            alert(errorMessage);
        });
    }
};

export const asyncSaveScene = (orderId, formData, id, showError) => {

    return dispatch => {

        dispatch({ type: actions['SCENES_SET_DISABLED'], payload: true });
        
        Request.send({
            type: 'post',
            url: createUrl(defaultSettings, urlSettings[(id !== false ? 'edit' : 'add') + 'Scene']),
            data: formData,
            processData: false,
            dataType: 'json',
            contentType: false
        })
        .then( (data) => {

            const {isError = false, errorMessage = ''} = data;

            if (isError) {
                dispatch({
                    type: actions['SCENES_SET_DIFFERENT_DATA'],
                    payload: { disabled: false, visible: true }
                });
                showError(errorMessage);
                return;
            }

            dispatch({
                type: actions['SCENES_SET_DIFFERENT_DATA'],
                payload: { disabled: false, isLoading: true, visible: false }
            });

            return Request.send({
                url: createUrl(defaultSettings, urlSettings['scenes']),
                data: { orderId }
            });
        })
        .then( (data) => {
            
            if (!data) {
                return;
            }

            const {collection = []} = data;

            dispatch({ type: actions['SCENES_SET_LOADING'], payload: false });
            dispatch({ type: actions['SCENES_SET_DATA'], payload: collection });
        })
        .catch((error) => {
            dispatch({ type: actions['SCENES_SET_LOADING'], payload: false });
            dispatch({ type: actions['SCENES_SET_DISABLED'], payload: false });
            console.log('error', error);
            const {message, statusText} = error;
            const errorMessage = statusText ? statusText : message;
            alert(errorMessage);
        });
    }
};

export const setScenesData = (data) => {
    return {
        type: actions.SCENES_SET_DIFFERENT_DATA,
        payload: data
    }
};