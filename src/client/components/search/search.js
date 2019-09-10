import React from "react";

export default function search() {
    return (
        <div>
            <div id={"searchDiv"}>
                <input type={"text"} />
                <input type={"hidden"} id={"Longitude"} />
                <input type={"hidden"} id={"latitude"} />
                <button type={"button"}>{"Search"}</button>
            </div>
        </div>
    );
}
