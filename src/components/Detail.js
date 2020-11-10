import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DetailContent from "./DetailContent";
import Button from "./Button";
import Spinner from "./Spinner";
import Error from "./Error";
import { loadDetails } from "../actions/detail";

const Detail = props => {
    const { match: { params: { code } }, history } = props;

    const dispatch = useDispatch();

    const { details, borders, loading, error } = useSelector(state => state.detail);
    const { initialList: countries } = useSelector(state => state.countries);

    useEffect(() => {
        if (countries && countries.length > 0) {
            dispatch(loadDetails(code, countries));
        }
    }, [dispatch, code, countries])

    useEffect(() => {
        document.querySelector("body").classList.add("detail");
    }, [])

    return (
        <section className="detail-page">
            <Button big icon text="Back" clicked={() => history.goBack()} style={{ userSelect: "none" }} />
            {loading ? <Spinner /> :
                error ? <Error /> :
                    details && <DetailContent details={details} borders={borders} />}
        </section>
    )
}

export default Detail;
