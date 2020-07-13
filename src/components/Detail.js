import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Zoom from "react-reveal/Zoom";
import axios from "axios";
import Button from "./Button";
import DetailLine from "./DetailLine";
import Spinner from "./Spinner";
import Error from "./Error";

const Detail = props => {
    const [details, setDetails] = useState(null);
    const [borders, setBorders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const history = useHistory();

    useEffect(() => {
        document.querySelector("body").classList.add("detail");
        document.querySelector("body").style.overflowY = "scroll";
    }, [])

    useEffect(() => {
        setDetails(null)
        setBorders([]);
        setLoading(true);

        axios.get("https://restcountries.eu/rest/v2/alpha/" + props.match.params.code)
            .then(response => {
                setDetails(response.data);
                setLoading(false);
                setError(false);

                response.data.borders.forEach(code => {
                    axios.get("https://restcountries.eu/rest/v2/alpha/" + code)
                        .then(res => {
                            setBorders(borders => [...borders, { name: res.data.name, code: code }])
                        })
                })
            })
            .catch(() => {
                setLoading(false);
                setError(true);
            })
    }, [props.match.params.code])

    const prevPageHandler = () => {
        history.goBack();
    }

    const mapWithCommas = (array, withName) => {
        if (array[0] === "") {
            return "-";
        }
        else {
            return array.map((item, index) => {
                if (withName) {
                    return index === array.length - 1 ? item.name : item.name + ", ";
                }
                else {
                    return index === array.length - 1 ? item : item + ", ";
                }
            })
        }
    }

    return (
        <section className="detail-page">
            <Button big icon text="Back" clicked={prevPageHandler} style={{userSelect: "none"}} />
            {loading ? <Spinner /> : null}
            {error ? <Error /> : null}
            {details ? (
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
                                        value={mapWithCommas(details.topLevelDomain, false)}
                                    />
                                    <DetailLine
                                        title="Currencies"
                                        value={mapWithCommas(details.currencies, true)}
                                    />
                                    <DetailLine
                                        title="Languages"
                                        value={mapWithCommas(details.languages, true)}
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
            ) : null}
        </section>
    )
}

export default Detail;
