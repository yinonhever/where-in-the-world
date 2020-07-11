import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import FilterArea from "./FilterArea";
import Input from "./Input";
import Select from "./Select";
import Grid from "./Grid";
import Spinner from "./Spinner";
import Error from "./Error";

const Home = () => {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const initialList = useRef(null);
    const inputList = useRef(null);
    const region = useRef(null);

    useEffect(() => {
        document.querySelector("body").classList.remove("detail");
        document.querySelector("body").style.overflow = "initial";
    }, [])

    useEffect(() => {
        axios.get("https://restcountries.eu/rest/v2/all")
            .then(response => {
                initialList.current = response.data;
                setCountries(initialList.current);
                setLoading(false);
            })
    }, [])

    const inputChangeHandler = input => {
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
        region.current = selection;
        if (inputList.current) {
            setCountries(filterByRegion(inputList));
        }
        else {
            setCountries(filterByRegion(initialList));
        }
    }

    const filterByRegion = list => {
        return list.current.filter(item => item.region.includes(region.current));
    }

    return (
        <main className="home">
            <FilterArea>
                <Input changed={inputChangeHandler} />
                <Select changed={regionSelectHandler} />
            </FilterArea>

            {loading ? <Spinner /> : null}
            {!loading && (error || countries.length === 0) ?
                <Error /> :
                <Grid items={countries} />}
        </main>
    )
}

export default Home;
