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
            className={"results-list-item"}
            style={{display: "block"}}
            onClick={setdesc}>
            <li>{props.obj.bank ? props.obj.bank.name : `Unknow Bank`}</li>
            <li>{props.obj.address ? props.obj.address : `Unknow Address`}</li>
            <li>{`distance : ${props.obj.dist.calculated}m`}</li>
            {console.log("Rendu terminal item")}
        </ButtonBase>
    );
}
