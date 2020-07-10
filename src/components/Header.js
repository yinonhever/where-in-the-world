import React from "react";

const Header = () => {
    const themeToggleHandler = () => {
        document.querySelector("body").classList.toggle("dark");
    }
    
    return (
        <header className="header">

        </header>
    )
}

export default Header;