import React from "react";

const Option = props => (
    <div className="select__option" onClick={() => props.clicked(props.text)}>
        {props.text}
    </div>
)

export default Option;