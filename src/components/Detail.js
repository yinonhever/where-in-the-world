import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DetailContent from "./DetailContent";
import Button from "./Button";
import Spinner from "./Spinner";
import Error from "./Error";
import { loadDetails } from "../actions/detail";

const Detail = props => {
    const { match: { params: { code } } } = props;

    const dispatch = useDispatch();

    const { details, borders, loading, error } = useSelector(state => state.detail);
    const { initialList: countries } = useSelector(state => state.countries);

    useEffect(() => {
        document.querySelector("body").classList.add("detail");
        document.querySelector("body").style.overflowY = "scroll";
    }, [])

    useEffect(() => {
        if (countries && countries.length > 0) {
            dispatch(loadDetails(code, countries));
        }
    }, [dispatch, code, countries])

    const prevPageHandler = () => {
        props.history.goBack();
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
