import React from "react";

const Button = props => {
    const classes = props.big ? "button button--lg" : "button button--sm";

    return (
        <div className={classes} onClick={props.clicked}>
            {props.icon ? <i className="button__icon fas fa-arrow-left"></i> : null}
            <span>{props.text}</span>
        </div>
    )
}

export default Button;