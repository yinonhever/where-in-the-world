import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import usePersistedState from "../usePersistedState";

const Header = () => {
    const [darkTheme, setDarkTheme] = usePersistedState("darkTheme", true);

    useEffect(() => {
        const body = document.querySelector("body").classList;
        if(darkTheme) {
            body.add("dark");
        }
        else {
            body.remove("dark");
        }
    }, [darkTheme])

    const themeToggleHandler = () => {
        setDarkTheme(!darkTheme);
    }

    return (
        <header className="header">
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                <h1 className="header__heading">Where in the world?</h1>
            </Link>
            <div className="toggler" onClick={themeToggleHandler}>
                <i className={darkTheme ? "toggler__icon fas fa-moon" : "toggler__icon far fa-moon"}></i>
                <span className="toggler__text">Dark Mode</span>
            </div>
        </header>
    )
}

export default Header;