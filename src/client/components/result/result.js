import React from "react";
import MapCtnr from "./map";
import TerminalCtnr from "./terminal-ctnr/terminal-ctnr";
import Search from "./search";

export default function result() {
    return (
        <div>
            <MapCtnr latitude={50.6412} longitude={5.5718} zoom={13} />
            <Search />
            <TerminalCtnr />
        </div>
    );
}
