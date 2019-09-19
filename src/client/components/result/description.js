import React, {Fragment, useEffect, useState} from "react";
import {Paper, Typography} from "@material-ui/core";
import DescriptionButtons from "./description-buttons/buttons";
import utils from "./../../js/utils";

export default function Description(props) {
    const [empty, setEmpty] = useState(!!props.obj.empty);

    useEffect(() => {
        setEmpty(props.obj.empty);
        props.obj.empty &&
            utils.updateTerminal(props.obj._id, "empty", props.obj.empty);
    }, [props.obj.empty]);

    const handleChangeEmpty = () => {
        if (props.obj.empty) {
            props.obj.empty = false;
        } else {
            props.obj.empty = true;
        }
        setEmpty(props.obj.empty);
    };

    return (
        <div className={"item-description-container"}>
            <Paper
                style={{
                    padding: "3vmin calc(1vmin + 0.5rem)",
                }}>
                <Typography
                    style={{
                        marginBottom: "20px",
                        fontFamily: "Roboto-Regular",
                    }}
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

                {props.obj.bank && (
                    <div className={"description-buttons"}>
                        <Fragment>
                            <p>{"Terminal actions:"}</p>
                            <DescriptionButtons
                                empty={empty}
                                handleEmpty={handleChangeEmpty}
                            />
                            {/* REPLACE WITH props.obj.status or bank.status */}
                        </Fragment>
                    </div>
                )}
            </Paper>
        </div>
    );
}
