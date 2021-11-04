import {
    DETAIL_LOAD_REQUEST,
    DETAIL_LOAD_SUCCESS,
    DETAIL_LOAD_FAIL
} from "./types";
import axios from "axios";

export const loadDetails = (code, countries) => async dispatch => {
    dispatch({ type: DETAIL_LOAD_REQUEST });

    try {
        const { data } = await axios.get(`https://restcountries.com/v2/alpha/${code}`);
        const details = { ...data };
        const borders = [];

        if (countries) {
            if (data.borders) {
                data.borders.forEach(borderCode => {
                    const newBorder = countries.find(country => country.alpha3Code === borderCode);
                    borders.push({ name: newBorder.name, code: borderCode });
                })
            }
        }

        dispatch({
            type: DETAIL_LOAD_SUCCESS,
            payload: { details, borders }
        });
    }
    catch {
        dispatch({ type: DETAIL_LOAD_FAIL });
    }
}