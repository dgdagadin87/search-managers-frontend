import actions from '../../../config/actions';

const initialState = {
    isLoading: false,
    visible: false,
    disabled: false,
    aoiData: {
        id: false,
        region: '',
        fileName: '',
        currentFile: null
    },
    aoi: []
};

export default function (state = initialState, action) {

    switch (action.type) {

        case actions.ORDER_SET_DATA:
            const { aoi = [] } = action['payload'];
            return { ...state, aoi };
        
        case actions.AOI_SET_LOADING:
            return { ...state, isLoading: action.payload };

        case actions.AOI_SET_DISABLED:
            return { ...state, disabled: action.payload };

        case actions.AOI_SET_DATA:
            return { ...state, aoi: action.payload };

        case actions.AOI_SET_DIFFERENT_DATA:
            return { ...state, ...action.payload };

        default:
            return state;

    }
}