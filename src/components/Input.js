import React, { useState } from "react";

const Input = props => {
    const [query, setQuery] = useState("");

    const changeHandler = event => {
        setQuery(event.target.value);
        props.changed(event.target.value);
    }

    return (
        <input
            type="text"
            className="input"
            placeholder="Search for a country..."
            value={query}
            onChange={event => changeHandler(event)}
        />
    )
}

export default Input;