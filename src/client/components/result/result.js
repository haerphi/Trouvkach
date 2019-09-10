import React from "react";
import MapCtnr from "./map";
import TerminalItem from "./terminal-item";
import Search from "./search";

export default function result() {
    return (
        <div>
            <Search />
            <MapCtnr />
            <TerminalItem />
        </div>
    );
}
