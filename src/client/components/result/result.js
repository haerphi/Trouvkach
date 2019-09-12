import React, {Fragment} from "react";
import MapCtnr from "./map";
import TerminalCtnr from "./terminal-ctnr/terminal-ctnr";
import {Container} from "@material-ui/core";

export default function result() {
    return (
        <Fragment>
            <MapCtnr latitude={50.6412} longitude={5.5718} zoom={13} />
            <Container className={"container content-container"}>
                <TerminalCtnr />
            </Container>
        </Fragment>
    );
}
