import React from "react";
import { Link } from "react-router-dom";
import Zoom from "react-reveal/Zoom";
import DetailLine from "./DetailLine";
import Button from "./Button";

const DetailContent = props => {
    const mapWithCommas = (array, withName) => {
        if (array[0] === "") {
            return "-";
        }
        else {
            return array.map((item, index) => {
                if (index === array.length - 1 || array[index + 1] === "") {
                    return withName ? item.name : item;
                }
                else {
                    return withName ? item.name + ", " : item + ", ";
                }
            })
        }
    }

    return (
        <Zoom duration={600}>
            <div className="detail-page__container">
                <img className="detail-page__flag" src={props.details.flag} alt={props.details.name} />
                <div className="detail-page__content">
                    <h2 className="detail-page__heading">{props.details.name}</h2>
                    <div className="detail-page__details">
                        <div className="detail-page__column">
                            <DetailLine title="Native Name" value={props.details.nativeName} />
                            <DetailLine number title="Population" value={props.details.population} />
                            <DetailLine title="Region" value={props.details.region} />
                            <DetailLine title="Sub Region" value={props.details.subregion} />
                            <DetailLine title="Capital" value={props.details.capital} />
                        </div>
                        <div className="detail-page__column">
                            <DetailLine
                                title="Top Level Domain"
                                value={mapWithCommas(props.details.topLevelDomain, false)}
                            />
                            <DetailLine
                                title="Currencies"
                                value={mapWithCommas(props.details.currencies, true)}
                            />
                            <DetailLine
                                title="Languages"
                                value={mapWithCommas(props.details.languages, true)}
                            />
                        </div>
                    </div>
                    <div className="detail-page__buttons-row" style={{
                        display: props.borders.length === 0 ? "none" : "flex"
                    }}>
                        <span className="detail-page__buttons-title">Border Countries:</span>
                        <div className="detail-page__buttons">
                            {props.borders.map(border => (
                                <Link
                                    to={"/details/" + border.code}
                                    key={border.code}
                                    style={{ textDecoration: "none", color: "inherit" }}>
                                    <Button text={border.name} />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Zoom>
    )
}

export default DetailContent;