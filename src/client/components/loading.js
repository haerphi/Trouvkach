import React from "react";

export default function loading() {
    const styles = {
        width: "20%",
        height: "20%",
        backgroundColor: "black",
        color: "white",
        zIndex: "10",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
    };

    return <div style={styles}>{`Loading. Please Wait.`}</div>;
}
