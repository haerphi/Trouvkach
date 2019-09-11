import React from "react";
import MapCtnr from "./../result/map";

export default function item() {
    return (
        <div>
            <MapCtnr latitude={13} longitude={0.59} zoom={13} />
            {`Modalitem`}
        </div>
    );
}
