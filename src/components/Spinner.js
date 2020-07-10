import React from "react";

const Spinner = () => (
    <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
    }}>
        <div class="loader">Loading...</div>
    </div>
)

export default Spinner;