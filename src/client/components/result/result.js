import React from "react";
import Map from "./map";
import TerminalItem from "./terminal-item";
import Search from "./search";

export default function result() {
    return (
        <div>
            <Search />
            <Map />
            <TerminalItem />
        </div>
    );
}
