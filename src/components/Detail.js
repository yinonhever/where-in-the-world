import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "./Spinner";

const Detail = props => {
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        document.querySelector("body").classList.add("detail");
    }, [])

    useEffect(() => {
        axios.get("https://restcountries.eu/rest/v2/alpha/" + props.match.params.code)
            .then(response => {
                setDetails(response.data);
                setLoading(false);
                console.log(response.data)
            })
    }, [props.match.params.code])

    return (
        <section className="detail">
            {loading ? <Spinner /> : (
                <div className="detail__container">

                </div>
            )}
        </section>
    )
}

export default Detail;
