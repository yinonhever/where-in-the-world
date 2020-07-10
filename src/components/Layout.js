import React from "react";
import { Route, Switch } from "react-router-dom";
import Auxilliary from "../hoc/Auxilliary";
import Header from "./Header";
import Home from "./Home";
import Detail from "./Detail";

const Layout = () => (
        <Auxilliary>
            <Header />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/details/:code" component={Detail} />
            </Switch>
        </Auxilliary>
)

export default Layout;
