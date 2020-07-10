import React, { useState } from "react";

const Select = props => {
    const [selected, setSelected] = useState("Filter By Region");
    const [active, setActive] = useState(false);

    const openHandler = () => {
        setActive(true);
    }

    const selectHandler = selection => {
        setActive(false);
        setSelected(selection);
        props.changed(selection);
    }

    return (
        <div className={active ? "select active" : "select"}>
        
        </div>
    )
}

export default Select;