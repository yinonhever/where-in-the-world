import React from "react";
import FilterArea from "./FilterArea";
import Input from "./Input";
import Select from "./Select";
import Grid from "./Grid";
import Spinner from "./Spinner";
import Error from "./Error";

const Home = props => (
    <main className="home">
        <FilterArea>
            <Input changed={props.inputChanged} value={props.inputValue} />
            <Select changed={props.regionChanged} selected={props.selectedRegion} />
        </FilterArea>

        {props.loading ? <Spinner /> : null}
        {!props.loading && (props.error || props.countries.length === 0) ?
            <Error /> :
            <Grid items={props.countries} />}
    </main>
)

export default Home;