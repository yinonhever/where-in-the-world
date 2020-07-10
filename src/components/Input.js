import React, { useState } from "react";

const Input = props => {
    const [query, setQuery] = useState("");

    const changeHandler = event => {
        setQuery(event.target.value);
        props.changed(event.target.value);
    }

    return (
        <div className="input">
            <div className="input__icon-area">
                <i class="input__icon fas fa-search"></i>
            </div>
            <input
                type="text"
                className="input__type-area"
                placeholder="Search for a country..."
                value={query}
                onChange={event => changeHandler(event)}
            />
        </div>
    )
}

export default Input;