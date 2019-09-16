/* eslint-disable no-unused-vars */
import React from "react";
import {ButtonBase} from "@material-ui/core";

export default function viewTerminal(props) {
    const setdesc = () => {
        if (window.innerWidth < 767) {
            document.querySelector(".box-wrapper").classList.add("show");
        }
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
            <li
                className={"item-property item-name"}
                style={{color: "#26a69a"}}>
                {props.obj.bank ? props.obj.bank.name : `Unknow Bank`}
            </li>
            <li className={"item-property item-distance"}>
                {`distance: ${Math.trunc(props.obj.dist.calculated)}m`}
            </li>
            <li id={props.obj._id} className={"item-property item-address"}>
                {props.obj.address ? props.obj.address : `Unknow Address`}
            </li>
            {console.log("Rendu terminal item")}
        </ButtonBase>
    );
}
