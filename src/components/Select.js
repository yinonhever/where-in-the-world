import React, { useState } from "react";

const Select = props => {
    const [selected, setSelected] = useState("Filter By Region");
    const [active, setActive] = useState(false);

    const openHandler = () => {
        setActive(!active);
    }

    const selectHandler = selection => {
        setActive(false);
        setSelected(selection);
        props.changed(selection);
    }

    return (
        <div className={active ? "select active" : "select"}>
            <div className="select__trigger" onClick={openHandler}>
                <span className="select__trigger-text">{selected}</span>
                <i className="select__icon fas fa-chevron-down"></i>
            </div>
            <div className="select__dropdown">
                <div className="select__options">
                    <div className="select__option" onClick={() => selectHandler("Africa")}>Africa</div>
                    <div className="select__option" onClick={() => selectHandler("America")}>America</div>
                    <div className="select__option" onClick={() => selectHandler("Asia")}>Asia</div>
                    <div className="select__option" onClick={() => selectHandler("Europe")}>Europe</div>
                    <div className="select__option" onClick={() => selectHandler("Oceania")}>Oceania</div>
                </div>
            </div>
        </div>
    )
}

export default Select;