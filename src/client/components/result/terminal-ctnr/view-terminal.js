import React from "react";

export default function viewTerminal(props) {
    return (
        <div>
            <div>{props.obj.address}</div>
            <div>{props.obj.bank.name}</div>
            <div>{`distance : ${props.obj.dist.calculated}m`}</div>
        </div>
    );
}
