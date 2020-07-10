import React from "react";
import { Link } from "react-router-dom";
import Card from "./Card";

const Grid = props => (
    <section className="grid">
        {props.items.map(item => (
            <div></div>
        ))}
    </section>
)

export default Grid;