import React, {Fragment} from "react";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import MoneyOffIcon from "@material-ui/icons/MoneyOff"; // EMPTY
import AttachMoneyIcon from "@material-ui/icons/AttachMoney"; // FILLED
import DeleteIcon from "@material-ui/icons/Delete"; // DELETE
import utils from "./../../../js/utils";

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
    },
    leftIcon: {
        marginRight: theme.spacing(1),
    },
    rightIcon: {
        marginLeft: theme.spacing(1),
    },
    iconSmall: {
        fontSize: 20,
    },
}));

export default function descriptionButtons(props) {
    const classes = useStyles();
    const handleMyFunction = () => {
        console.log(props.obj);
        utils.updateTerminalStatus(
            props.obj._id,
            typeof props.status === "undefined" ? "FILLED" : props.status,
        );
    };

    return (
        <Fragment>
            <Button
                variant={"contained"}
                color={"secondary"}
                className={classes.button}>
                {"Delete"}
                <DeleteIcon className={classes.rightIcon} />
            </Button>
            <Button
                variant={"contained"}
                color={"primary"}
                className={classes.button}
                onClick={handleMyFunction}>
                {typeof props.status === "undefined" ? "EMPTY" : props.status}

                {props.empty ? (
                    <AttachMoneyIcon className={classes.rightIcon} />
                ) : (
                    <MoneyOffIcon className={classes.rightIcon} />
                )}
            </Button>
        </Fragment>
    );
}
