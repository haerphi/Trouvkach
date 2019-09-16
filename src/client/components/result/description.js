import React from "react";
import {Paper, Typography} from "@material-ui/core";

export default function Description(props) {
    return (
        <div className={"item-description-container"}>
            <Paper
                style={{
                    padding: "3vmin calc(1vmin + 0.5rem)",
                }}>
                <Typography
                    style={{marginBottom: "20px", fontFamily: "Roboto-Regular"}}
                    component={"p"}
                    align={"center"}>
                    {"Item's Description!"}
                </Typography>
                <div>{props.obj.address && props.obj.address}</div>
                <div>{props.obj.bank && props.obj.bank.name}</div>
                <div>
                    {props.obj.dist &&
                        `${Math.trunc(props.obj.dist.calculated)} m`}
                </div>
            </Paper>
        </div>
    );
}
