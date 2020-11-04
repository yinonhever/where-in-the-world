import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchCountriesByName } from "../actions/countries";

const Input = () => {
    const dispatch = useDispatch();

    const { searchInput } = useSelector(state => state.countries);

    const changeHandler = event => {
        dispatch(searchCountriesByName(event.target.value));
    }

    return (
        <div className="input">
            <div className="input__icon-area">
                <i className="input__icon fas fa-search"></i>
            </div>
            <input
                type="text"
                className="input__type-area"
                placeholder="Search for a country..."
                value={searchInput}
                onChange={changeHandler}
                aria-label="Search for a country"
            />
        </div>
    );
}

export default Input;