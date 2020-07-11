import React, { useState } from "react";
import Option from "./Option";

const Select = props => {
    const [selected, setSelected] = useState("Filter By Region");
    const [active, setActive] = useState(false);

    const clickHandler = () => {
        setActive(!active);
    }

    const selectHandler = selection => {
        setActive(false);
        setSelected(selection);
        props.changed(selection);
    }

    return (
        <div className={active ? "select active" : "select"}>
            <div className="select__trigger" onClick={clickHandler}>
                <span className="select__trigger-text">{selected}</span>
                <i className="select__icon fas fa-chevron-down"></i>
            </div>
            <div className="select__dropdown">
                <div className="select__options">
                    {["Africa", "America", "Asia", "Europe", "Oceania"].map(item => (
                        <Option text={item} key={item} clicked={selectHandler} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Select;