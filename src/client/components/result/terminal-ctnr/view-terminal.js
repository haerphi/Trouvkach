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
            <li>{props.obj.bank}</li>
            <li>{props.obj.address}</li>
            <li>{`distance : ${props.obj.dist.calculated}m`}</li>
            {console.log("Rendu terminal item")}
        </ButtonBase>
    );
}
