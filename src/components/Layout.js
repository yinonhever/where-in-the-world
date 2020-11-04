import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import Auxilliary from "../hoc/Auxilliary";
import Header from "./Header";
import Home from "./Home";
import Detail from "./Detail";
import { loadCountries } from "../actions/countries";

const Layout = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadCountries());
    }, [dispatch])

    return (
        <Auxilliary>
            <Header />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/details/:code" component={Detail} />
                <Redirect from="/" to="/" />
            </Switch>
        </Auxilliary>
    )
}

export default Layout;
