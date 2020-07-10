import React, { useState, useEffect } from "react";
import axios from "axios";

const Detail = props => {
    const [details, setDetails] = useState(null);

    useEffect(() => {
        document.querySelector("body").classList.add("detail");
    }, [])

    useEffect(() => {
        axios.get("https://restcountries.eu/rest/v2/alpha/" + props.match.params.code)
            .then(response => {
                setDetails(response.data);
            })
    }, [props.match.params.code])

    return (
        <section className="detail">
            {details ? (
                <div className="detail__container">

                </div>
            ) : null}
        </section>
    )
}

export default Detail;
