import actions from '../../../config/actions';

const initialState = {
    isLoading: false,
    visible: false,
    disabled: false,
    scenesData: {
        id: false,
        name: '',
        course: null,
        partOfScene: undefined,
        partOfSceneCost: null,
        cost: null,
        square: null,
        discount: null,
        handling: undefined,
        costOfHandling: null,
        discountOfHandling: null,
        courseOfHandling: null,
        aoiId: undefined,
        dType: undefined,
        files: []
    },
    scenes: []
};

export default function (state = initialState, action) {

    switch (action.type) {

        case actions.ORDER_SET_DATA:
            const { scenes = [] } = action['payload'];
            return { ...state, scenes };
        
        case actions.SCENES_SET_LOADING:
            return { ...state, isLoading: action.payload };

        case actions.SCENES_SET_DISABLED:
            return { ...state, disabled: action.payload };

        case actions.SCENES_SET_DATA:
            return { ...state, scenes: action.payload };

        case actions.SCENES_SET_DIFFERENT_DATA:
            return { ...state, ...action.payload };

        default:
            return state;

    }
}