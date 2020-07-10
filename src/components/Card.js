import React from "react";
import Fade from "react-reveal/Fade";

const Card = props => (
    <Fade bottom duration={700}>
        <div className="card">
            <img className="card__flag" src={props.flag} alt={props.name} />
            <div className="card__content">
                <h3 className="card__title">{props.name}</h3>
                <p className="card__line">
                    <span className="card__line-title">Population: </span>
                    <span>{props.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                </p>
                <p className="card__line">
                    <span className="card__line-title">Region: </span>
                    <span>{props.region}</span>
                </p>
                <p className="card__line">
                    <span className="card__line-title">Capital: </span>
                    <span>{props.capital !== "" ? props.capital : "-"}</span>
                </p>
            </div>
        </div>
    </Fade>
)

export default Card;