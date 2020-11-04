import {
    COUNTRIES_LOAD_REQUEST,
    COUNTRIES_LOAD_SUCCESS,
    COUNTRIES_LOAD_FAIL,
    COUNTRIES_SEARCH_REQUEST,
    COUNTRIES_SEARCH_SUCCESS,
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

    if (input === "") {
        dispatch({
            type: COUNTRIES_SEARCH_SUCCESS,
            payload: {
                countries: region ? filterByRegion(initialList, region) : initialList,
                inputList: null
            }
        });
    }
    else {
        const inputList = initialList.filter(country =>
            country.name.toLowerCase().includes(input.toLowerCase()) ||
            country.altSpellings.find(name =>
                name.toLowerCase().includes(input.toLowerCase())));

        dispatch({
            type: COUNTRIES_SEARCH_SUCCESS,
            payload: {
                countries: region ? filterByRegion(inputList, region) : inputList,
                inputList: inputList
            }
        });

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