import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import FilterArea from "./FilterArea";
import Input from "./Input";
import Select from "./Select";
import Grid from "./Grid";

const Home = () => {
    const [countries, setCountries] = useState([]);
    const initialList = useRef(null);
    const inputList = useRef(null);
    const region = useRef(null);

    useEffect(() => {
        document.querySelector("body").classList.remove("detail");
    }, [])

    useEffect(() => {
        axios.get("https://restcountries.eu/rest/v2/all")
            .then(response => {
                initialList.current = response.data;
                setCountries(initialList.current);
            })
    }, [])

    const inputChangeHandler = input => {
        if (input === "") {
            inputList.current = null;
            if (region) {
                setCountries(filterByRegion(initialList));
            }
            else {
                setCountries(initialList.current);
            }
        }
        else {
            axios.get("https://restcountries.eu/rest/v2/name/" + input)
                .then(response => {
                    inputList.current = response.data;
                    if (region) {
                        setCountries(filterByRegion(inputList));
                    }
                    else {
                        setCountries(inputList.current);
                    }
                })
        }
    }

    const regionSelectHandler = selection => {
        region.current = selection;
        if (inputList) {
            setCountries(filterByRegion(inputList));
        }
        else {
            setCountries(filterByRegion(initialList));
        }
    }

    const filterByRegion = list => {
        return list.current.filter(item => item.region === region.current);
    }

    return (
        <main className="home">
            <FilterArea>
                <Input changed={inputChangeHandler} />
                <Select changed={regionSelectHandler} />
            </FilterArea>

            <Grid items={countries} />
        </main>
    )
}

export default Home;
