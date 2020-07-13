import React from "react";

const Input = props => (
    <div className="input">
        <div className="input__icon-area">
            <i className="input__icon fas fa-search"></i>
        </div>
        <input
            type="text"
            className="input__type-area"
            placeholder="Search for a country..."
            value={props.value}
            onChange={event => props.changed(event.target.value)}
            aria-label="Search for a country"
        />
    </div>
)

export default Input;