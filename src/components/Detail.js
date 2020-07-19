import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import DetailContent from "./DetailContent";
import Button from "./Button";
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
                response.data.borders.forEach(code => {
                    const newBorder = props.countries.find(country => country.alpha3Code === code);
                    setBorders(borders => [...borders, {name: newBorder.name, code: code}]);
                })
                setDetails(response.data);
                setLoading(false);
                setError(false);
            })
            .catch(() => {
                setLoading(false);
                setError(true);
            })
    }, [props.match.params.code, props.countries])

    const prevPageHandler = () => {
        history.goBack();
    }

    return (
        <section className="detail-page">
            <Button big icon text="Back" clicked={prevPageHandler} style={{ userSelect: "none" }} />
            {loading ? <Spinner /> : null}
            {error ? <Error /> : null}
            {details ? <DetailContent details={details} borders={borders} /> : null}
        </section>
    )
}

export default Detail;
