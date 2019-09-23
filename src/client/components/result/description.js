import React, {Fragment, useEffect, useState} from "react";
import {Paper, Typography} from "@material-ui/core";
import DescriptionButtons from "./description-buttons/buttons";
import utils from "./../../js/utils";

export default function Description(props) {
    const [empty, setEmpty] = useState(!!props.obj.empty);
    const [deleted, setDeleted] = useState(!!props.obj.delete);

    const myLatitude = props.latitude;
    const myLongitude = props.longitude;

    useEffect(() => {
        setEmpty(props.obj.empty);
    }, [props.obj.empty]);

    useEffect(() => {
        setDeleted(props.obj.delete);
    }, [props.obj.delete]);

    const handleChangeEmpty = () => {
        if (props.obj.empty) {
            props.obj.empty = false;
        } else {
            props.obj.empty = true;
        }
        setEmpty(props.obj.empty);
        utils.updateTerminal(props.obj._id, "empty", props.obj.empty);
    };

    const handleChangeDelete = () => {
        if (props.obj.delete) {
            props.obj.delete = false;
        } else {
            props.obj.delete = true;
        }
        setDeleted(props.obj.delete);
        utils.updateTerminal(props.obj._id, "delete", props.obj.delete);
    };

    return (
        <div
            className={`item-description-container ${
                deleted ? "deleted-item" : ""
            }`}>
            <Paper
                style={{
                    padding: "3vmin calc(1vmin + 0.5rem)",
                }}>
                <Typography
                    className={"keep-message"}
                    style={{
                        marginBottom: "20px",
                        fontFamily: "Roboto-Regular",
                    }}
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

                        <p>
                            <a
                                href={`https://maps.google.com/?saddr=${myLatitude},${myLongitude}&daddr=${props.obj.latitude},${props.obj.longitude}`}
                                target={"_blank"}
                                className={"google-maps-dir-link"}
                                style={{
                                    fontWeight: "600",
                                }}>
                                {"Google maps directions"}
                            </a>
                        </p>

                        {deleted && (
                            <p className={"keep-message"}>
                                <span
                                    style={{
                                        fontWeight: "600",
                                        color: "#f44336",
                                    }}>
                                    {
                                        "This ATM does no longer exist, it was reported as DELETED by one of our users"
                                    }
                                </span>
                            </p>
                        )}

                        <div className={"description-buttons"}>
                            <p className={"keep-message"}>
                                <span
                                    style={{
                                        fontWeight: "600",
                                    }}>
                                    {"Terminal actions:"}
                                </span>
                            </p>
                            <DescriptionButtons
                                emptyValue={empty}
                                handleEmpty={handleChangeEmpty}
                                deleteValue={deleted}
                                handleDelete={handleChangeDelete}
                            />
                        </div>
                    </Fragment>
                )}
            </Paper>
        </div>
    );
}
