import {
    COUNTRIES_LOAD_REQUEST,
    COUNTRIES_LOAD_SUCCESS,
    COUNTRIES_LOAD_FAIL,
    COUNTRIES_INPUT_CHANGE,
    COUNTRIES_SEARCH,
    COUNTRIES_FILTER_REGION
} from "../actions/types";

const initialState = {
    countries: [],
    searchInput: "",
    region: null,
    initialList: null,
    inputList: null,
    loading: true,
    error: false
}

const countriesReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case COUNTRIES_LOAD_REQUEST:
            return initialState;
        case COUNTRIES_LOAD_SUCCESS:
            return {
                ...state,
                countries: payload,
                initialList: payload,
                loading: false
            };
        case COUNTRIES_LOAD_FAIL:
            return {
                ...state,
                error: true,
                loading: false
            };
        case COUNTRIES_INPUT_CHANGE:
            return {
                ...state,
                loading: true
            };
        case COUNTRIES_SEARCH:
        case COUNTRIES_FILTER_REGION:
            return {
                ...state,
                ...payload,
                loading: false
            };
        default:
            return state;
    }
}

export default countriesReducer;