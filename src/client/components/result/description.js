import React, {Fragment} from "react";
import {Paper, Typography} from "@material-ui/core";
import DescriptionButtons from "./description-buttons/buttons";

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
                {props.obj.bank && (
                    <Fragment>
                        <p
                            style={{
                                color: `${props.obj.bank &&
                                    `#${
                                        props.obj.bank.color
                                            ? props.obj.bank.color
                                            : "26a69a"
                                    }`}`,
                            }}>
                            <span
                                style={{
                                    color: "rgba(0, 0, 0, 0.87)",
                                    fontWeight: "600",
                                }}>
                                {"Bank name: "}
                            </span>

                            {props.obj.bank && props.obj.bank.name}
                        </p>
                        <p>
                            <span
                                style={{
                                    fontWeight: "600",
                                }}>
                                {"Bank address: "}
                            </span>
                            {props.obj.address && props.obj.address}
                        </p>
                        <p>
                            <span
                                style={{
                                    fontWeight: "600",
                                }}>
                                {"Distance: "}
                            </span>
                            {props.obj.dist &&
                                `${Math.trunc(props.obj.dist.calculated)}m`}
                        </p>
                        <div className={"description-buttons"}>
                            <p>
                                <span
                                    style={{
                                        fontWeight: "600",
                                    }}>
                                    {"Terminal actions:"}
                                </span>
                            </p>
                            <DescriptionButtons obj={props.obj} />
                        </div>
                    </Fragment>
                )}
            </Paper>
        </div>
    );
}
