import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

import actions from '../../config/actions';
import Request from '../../core/request';
import {createUrl} from '../../core/coreUtils';
import {defaultSettings, urlSettings} from '../../config/settings';


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

export const asyncSaveAOI = (formData, id, orderId) => {

    return async (dispatch) => {

        dispatch({ type: actions['AOI_SET_DISABLED'], payload: true });
        
        try {
            await Request.send({
                type: 'post',
                url: createUrl(defaultSettings, urlSettings[(id !== false ? 'edit' : 'add') + 'AOI']),
                data: formData,
                processData: false,
                dataType: 'json',
                contentType: false
            });
    
            dispatch({
                type: actions['AOI_SET_DIFFERENT_DATA'],
                payload: { disabled: false, isLoading: true, visible: false }
            });
    
            const aoiData = await Request.send({
                url: createUrl(defaultSettings, urlSettings['getAOI']),
                data: { orderId }
            });
    
            dispatch({ type: actions['AOI_SET_LOADING'], payload: false });
            dispatch({ type: actions['AOI_SET_DATA'], payload: aoiData });
        }
        catch (error) {
            dispatch({ type: actions['AOI_SET_LOADING'], payload: false });
            dispatch({ type: actions['AOI_SET_DISABLED'], payload: false });
            console.log('error', error);
            const {message, statusText} = error;
            const errorMessage = statusText ? statusText : message;
            alert(errorMessage);
        }
    }
};

export const asyncDeleteAOI = (id, orderId, clientId, showError) => {

    return dispatch => {

        dispatch({ type: actions['AOI_SET_LOADING'], payload: true });

        Request.send({
            url: createUrl(defaultSettings, urlSettings['deleteAOI']),
            data: { id, orderId, clientId }
        })
        .then( (data) => {

            const {isError = false, errorMessage = ''} = data;

            if (isError) {
                dispatch({ type: actions['AOI_SET_LOADING'], payload: false });
                showError(errorMessage);
                return;
            }

            return Request.send({
                url: createUrl(defaultSettings, urlSettings['getAOI']),
                data: { orderId }
            })
        })
        .then( (data) => {

            if (!data) {
                return;
            }

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

export function* deleteAoiSaga() {
    yield takeLatest(actions['AOI_DELETE_SAGA'], asyncDeleteAoi2);
}

function* asyncDeleteAoi2(action) {

    const {id, orderId, clientId, showError} = action.payload;

    yield put({type: actions['AOI_SET_LOADING'], payload: true});

    try {
        const data = yield call(Request.send, {
            url: createUrl(defaultSettings, urlSettings['deleteAOI']),
            data: { id, orderId, clientId }
        });

        const {isError = false, errorMessage = ''} = data;

        if (isError) {
            yield put({ type: actions['AOI_SET_LOADING'], payload: false });
            showError(errorMessage);
            return;
        }

        const aoiData = yield call(Request.send, {
            url: createUrl(defaultSettings, urlSettings['getAOI']),
            data: { orderId }
        });

        if (!aoiData) {
            return;
        }

        yield put({ type: actions['AOI_SET_LOADING'], payload: false });
        yield put({ type: actions['AOI_SET_DATA'], payload: aoiData });

    }
    catch (error) {
        yield put({ type: actions['AOI_SET_LOADING'], payload: false });
        console.log('error', error);
        const {message, statusText} = error;
        const errorMessage = statusText ? statusText : message;
        alert(errorMessage);
    }
 }

export const setAOIData = (data) => {
    return {
        type: actions.AOI_SET_DIFFERENT_DATA,
        payload: data
    }
};