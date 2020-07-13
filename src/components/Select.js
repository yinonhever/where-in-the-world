import React, { useState } from "react";
import Option from "./Option";

const Select = props => {
    const [active, setActive] = useState(false);

    const clickHandler = () => {
        setActive(!active);
    }

    const selectHandler = selection => {
        setActive(false);
        props.changed(selection);
    }

    return (
        <div className={active ? "select active" : "select"}>
            <div className="select__trigger" onClick={clickHandler}>
                <span className="select__trigger-text">{props.selected}</span>
                <i className="select__icon fas fa-chevron-down"></i>
            </div>
            <div className="select__dropdown">
                <div className="select__options">
                    {props.selected === "Filter By Region" ? null :
                        <Option text="All Regions" clicked={selectHandler} />}
                    {["Africa", "America", "Asia", "Europe", "Oceania"].map(item => (
                        <Option text={item} key={item} clicked={selectHandler} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Select;