import {
    COUNTRIES_LOAD_REQUEST,
    COUNTRIES_LOAD_SUCCESS,
    COUNTRIES_LOAD_FAIL,
    COUNTRIES_SEARCH_REQUEST,
    COUNTRIES_SEARCH_SUCCESS,
    COUNTRIES_SEARCH_FAIL,
    COUNTRIES_FILTER_REGION
} from "./types";
import axios from "axios";

const filterByRegion = (list, region) => list.filter(item => item.region.includes(region));

export const loadCountries = () => async dispatch => {
    dispatch({ type: COUNTRIES_LOAD_REQUEST });

    try {
        const { data } = await axios.get("https://restcountries.eu/rest/v2/all");

        dispatch({
            type: COUNTRIES_LOAD_SUCCESS,
            payload: data
        });
    }
    catch {
        dispatch({ type: COUNTRIES_LOAD_FAIL });
    }
}

export const searchCountriesByName = input => async (dispatch, getState) => {
    dispatch({
        type: COUNTRIES_SEARCH_REQUEST,
        payload: input
    });

    const { countries: { initialList, region } } = getState();

    let updatedCountries;

    if (input === "") {
        updatedCountries = region ? filterByRegion(initialList, region) : initialList;

        dispatch({
            type: COUNTRIES_SEARCH_SUCCESS,
            payload: {
                countries: updatedCountries,
                inputList: null
            }
        });
    }
    else {
        try {
            const { data } = await axios.get(`https://restcountries.eu/rest/v2/name/${input}`);
            updatedCountries = region ? filterByRegion(data, region) : data;

            dispatch({
                type: COUNTRIES_SEARCH_SUCCESS,
                payload: {
                    countries: updatedCountries,
                    inputList: data
                }
            });
        }
        catch {
            dispatch({ type: COUNTRIES_SEARCH_FAIL });
        }
    }
}

export const filterCountriesByRegion = selection => (dispatch, getState) => {
    const { countries: { initialList, inputList } } = getState();

    if (selection === "All Regions") {
        dispatch({
            type: COUNTRIES_FILTER_REGION,
            payload: {
                countries: inputList || initialList,
                region: null
            }
        });
    }
    else {
        dispatch({
            type: COUNTRIES_FILTER_REGION,
            payload: {
                countries: filterByRegion(inputList || initialList, selection),
                region: selection
            }
        })
    }
}