import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeSearchInput, searchCountriesByName } from "../actions/countries";

const Input = () => {
    const [searchValue, setSearchValue] = useState("");
    const firstRender = useRef(true);

    const dispatch = useDispatch();

    const { searchInput } = useSelector(state => state.countries);

    const changeHandler = event => {
        setSearchValue(event.target.value);
        dispatch(changeSearchInput());
    }

    useEffect(() => {
        setSearchValue(searchInput);
    }, [searchInput])

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }

        let timeout;

        if (searchValue !== searchInput) {
            if (searchValue === "") {
                dispatch(searchCountriesByName(searchValue));
            }
            else {
                timeout = setTimeout(() => {
                    dispatch(searchCountriesByName(searchValue));
                }, 500)
            }
        }

        return () => clearTimeout(timeout);
    }, [dispatch, searchValue, searchInput])

    return (
        <div className="input">
            <div className="input__icon-area">
                <i className="input__icon fas fa-search"></i>
            </div>
            <input
                type="text"
                className="input__type-area"
                placeholder="Search for a country..."
                value={searchValue}
                onChange={changeHandler}
                aria-label="Search for a country"
            />
        </div>
    );
}

export default Input;