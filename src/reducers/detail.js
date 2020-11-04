import {
    DETAIL_LOAD_REQUEST,
    DETAIL_LOAD_SUCCESS,
    DETAIL_LOAD_FAIL
} from "../actions/types";

const initialState = {
    details: null,
    borders: [],
    loading: true,
    error: false
}

const detailReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case DETAIL_LOAD_REQUEST:
            return initialState;
        case DETAIL_LOAD_SUCCESS:
            return {
                ...payload,
                loading: false,
                error: false
            };
        case DETAIL_LOAD_FAIL:
            return {
                ...state,
                loading: false,
                error: true
            };
        default:
            return state;
    }
}

export default detailReducer;