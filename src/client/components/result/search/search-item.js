import React from "react";

export default function searchItem(props) {
    const posChange = () => {
        props.onPositionChangeByItem(props.item);
        props.onResetSearch();
        console.log("research");
    };

    return (
        <li className={"search-result"} onClick={posChange}>
            {props.item.properties.geocoding.label}
        </li>
    );
}
