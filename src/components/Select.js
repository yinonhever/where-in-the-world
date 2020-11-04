import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Option from "./Option";
import { filterCountriesByRegion } from "../actions/countries";

const Select = () => {
    const [active, setActive] = useState(false);

    const dispatch = useDispatch();

    const { region } = useSelector(state => state.countries);

    const selectHandler = selection => {
        setActive(false);
        dispatch(filterCountriesByRegion(selection));
    }

    const options = ["Africa", "America", "Asia", "Europe", "Oceania"];

    return (
        <div className={active ? "select active" : "select"}>
            <div className="select__trigger" onClick={() => setActive(!active)}>
                <span className="select__trigger-text">
                    {region || "Filter By Region"}
                </span>
                <i className="select__icon fas fa-chevron-down"></i>
            </div>
            <div className="select__dropdown">
                <div className="select__options">
                    {region && <Option text="All Regions" clicked={selectHandler} />}
                    {options.map(option => (
                        <Option text={option} key={option} clicked={selectHandler} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Select;