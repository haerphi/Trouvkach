import React from "react";

export default function searchItem(props) {
    const posChange = () => {
        props.onPositionChangeByItem(props.item);
        props.onResetSearch();
    };

    return (
        <div
            style={{backgroundColor: "white", color: "black"}}
            onClick={posChange}>
            {props.item.properties.geocoding.label}
            <hr />
        </div>
    );
}
