import React from "react";
import Fade from "react-reveal/Fade";
import DetailLine from "./DetailLine";

const Card = props => (
    <Fade bottom duration={700}>
        <div style={{height: "100%"}}>
            <div className="card">
                <img className="card__flag" src={props.flag} alt={props.name} />
                <div className="card__content">
                    <h3 className="card__title">{props.name}</h3>
                    <DetailLine number title="Population" value={props.population} />
                    <DetailLine title="Region" value={props.region} />
                    <DetailLine title="Capital" value={props.capital} />
                </div>
            </div>
        </div>

    </Fade>
)

export default Card;