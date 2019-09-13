/* eslint-disable no-unused-vars */
import React from "react";
import {ButtonBase} from "@material-ui/core";

export default function viewTerminal(props) {
    const setdesc = () => {
        props.setdescription(props.obj);
        console.log(`obj clicked =>`);
        console.log(props.obj);
    };

    return (
        <ButtonBase
            component={"ul"}
            className={"results-item"}
            style={{display: "block"}}
            onClick={setdesc}>
            <li className={"item-property item-name"}>
                {props.obj.bank ? props.obj.bank.name : `Unknow Bank`}
            </li>
            <li id={props.obj._id} className={"item-property item-distance"}>
                {props.obj.address ? props.obj.address : `Unknow Address`}
            </li>
            <li
                className={
                    "item-property item-distance"
                }>{`distance : ${Math.trunc(props.obj.dist.calculated)}m`}</li>
            {console.log("Rendu terminal item")}
        </ButtonBase>
    );
}
