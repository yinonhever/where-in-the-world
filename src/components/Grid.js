import React from "react";
import { Link } from "react-router-dom";
import Card from "./Card";

const Grid = props => (
    <section className="grid">
        {props.items.map(item => (
            <Link
                to={"/details/" + item.alpha3Code}
                key={item.alpha3Code}
                style={{
                    textDecoration: "none",
                    color: "inherit"
                }}>
                <Card
                    flag={item.flag}
                    name={item.name}
                    population={item.population}
                    region={item.region}
                    capital={item.capital}
                />
            </Link>
        ))}
    </section>
)

export default Grid;