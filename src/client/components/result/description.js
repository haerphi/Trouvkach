import React from "react";
import {Paper} from "@material-ui/core";

export default function Description(props) {
    return (
        <div className={"item-description-container"}>
            <Paper
                style={{
                    padding: "4vmin",
                }}>
                {`Fucking Description!`}
                <div>{props.obj.address && props.obj.address}</div>
                <div>{props.obj.bank && props.obj.bank.name}</div>
                <div>{props.obj.dist && `${props.obj.dist.calculated} m`}</div>
            </Paper>
        </div>
    );
}
