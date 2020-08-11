import React from "react";
import { Link } from "react-router-dom";
import Zoom from "react-reveal/Zoom";
import DetailLine from "./DetailLine";
import Button from "./Button";

const DetailContent = props => {
    const { details, borders } = props;

    const mapWithCommas = (array, prop) => {
        const checkForEmptyValue = index => {
            if (prop) {
                return index === array.length - 1 || !array[index + 1][prop];
            }
            else {
                return index === array.length - 1 || array[index + 1].toString().trim() === "";
            }
        }

        if (array[0].toString().trim() === "") {
            return "-";
        }
        else {
            return array.map((item, index) => {
                if (prop) {
                    return checkForEmptyValue(index) ? item[prop] : item[prop] + ", ";
                }
                else {
                    return checkForEmptyValue(index) ? item : item + ", ";
                }
            })
        }
    }

    return (
        <Zoom duration={600}>
            <div className="detail-page__container">
                <img className="detail-page__flag" src={details.flag} alt={details.name} />
                <div className="detail-page__content">
                    <h2 className="detail-page__heading">{details.name}</h2>
                    <div className="detail-page__details">
                        <div className="detail-page__column">
                            <DetailLine title="Native Name" value={details.nativeName} />
                            <DetailLine number title="Population" value={details.population} />
                            <DetailLine title="Region" value={details.region} />
                            <DetailLine title="Sub Region" value={details.subregion} />
                            <DetailLine title="Capital" value={details.capital} />
                        </div>
                        <div className="detail-page__column">
                            <DetailLine
                                title="Top Level Domain"
                                value={mapWithCommas(details.topLevelDomain)}
                            />
                            <DetailLine
                                title="Currencies"
                                value={mapWithCommas(details.currencies, "name")}
                            />
                            <DetailLine
                                title="Languages"
                                value={mapWithCommas(details.languages, "name")}
                            />
                        </div>
                    </div>
                    <div className="detail-page__buttons-row" style={{
                        display: borders.length === 0 ? "none" : "flex"
                    }}>
                        <span className="detail-page__buttons-title">Border Countries:</span>
                        <div className="detail-page__buttons">
                            {borders.map(border => (
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