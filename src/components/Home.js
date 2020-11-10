import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import FilterArea from "./FilterArea";
import Input from "./Input";
import Select from "./Select";
import Grid from "./Grid";
import Spinner from "./Spinner";
import Error from "./Error";

const Home = () => {
    const { countries, loading, error } = useSelector(state => state.countries);

    useEffect(() => {
        document.querySelector("body").classList.remove("detail");
    }, [])

    return (
        <main className="home">
            <FilterArea>
                <Input />
                <Select />
            </FilterArea>

            {loading ? <Spinner /> :
                error || countries.length === 0 ? <Error />
                    : <Grid items={countries} />}
        </main>
    )
}

export default Home;