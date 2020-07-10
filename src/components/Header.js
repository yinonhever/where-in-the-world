import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
    const [darkTheme, setDarkTheme] = useState(false);

    const themeToggleHandler = () => {
        setDarkTheme(!darkTheme);
        document.querySelector("body").classList.toggle("dark");
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