/* eslint-disable no-unused-vars */
import React from "react";
import {ButtonBase} from "@material-ui/core";

export default function viewTerminal() {
    return (
        <ButtonBase
            component={"ul"}
            className={"results-item"}
            style={{display: "block"}}>
            {`No atm found.`}
        </ButtonBase>
    );
}
