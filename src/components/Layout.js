import React, { useState, useEffect, useRef } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import axios from "axios";
import Auxilliary from "../hoc/Auxilliary";
import Header from "./Header";
import Home from "./Home";
import Detail from "./Detail";

const Layout = () => {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [currentInput, setCurrentInput] = useState("");
    const initialList = useRef(null);
    const inputList = useRef(null);
    const region = useRef(null);

    useEffect(() => {
        axios.get("https://restcountries.eu/rest/v2/all")
            .then(response => {
                initialList.current = response.data;
                setCountries(initialList.current);
                setLoading(false);
            })
    }, [])

    const inputChangeHandler = input => {
        setCurrentInput(input);

        if (input === "") {
            setError(false);
            inputList.current = null;
            if (region.current) {
                setCountries(filterByRegion(initialList));
            }
            else {
                setCountries(initialList.current);
            }
        }
        else {
            axios.get("https://restcountries.eu/rest/v2/name/" + input)
                .then(response => {
                    setError(false);
                    inputList.current = response.data;
                    if (region.current) {
                        setCountries(filterByRegion(inputList));
                    }
                    else {
                        setCountries(inputList.current);
                    }
                })
                .catch(() => {
                    setError(true);
                })
        }
    }

    const regionSelectHandler = selection => {
        if (selection === "All Regions") {
            region.current = null;
            if (inputList.current) {
                setCountries(inputList.current);
            }
            else {
                setCountries(initialList.current);
            }
        }
        else {
            region.current = selection;
            if (inputList.current) {
                setCountries(filterByRegion(inputList));
            }
            else {
                setCountries(filterByRegion(initialList));
            }
        }
    }

    const filterByRegion = list => {
        return list.current.filter(item => item.region.includes(region.current));
    }

    return (
        <Auxilliary>
            <Header />
            <Switch>
                <Route path="/" exact render={() =>
                    <Home
                        countries={countries}
                        inputValue={currentInput}
                        inputChanged={inputChangeHandler}
                        selectedRegion={region.current ? region.current : "Filter By Region"}
                        regionChanged={regionSelectHandler}
                        loading={loading}
                        error={error}
                    />
                } />

                <Route path="/details/:code" render={props => (
                    <Detail countries={initialList.current} {...props} />
                )} />

                <Redirect from="/" to="/" />
            </Switch>
        </Auxilliary>
    )
}

export default Layout;
