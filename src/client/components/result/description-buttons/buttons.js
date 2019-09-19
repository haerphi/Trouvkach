import React, {Fragment} from "react";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import MoneyOffIcon from "@material-ui/icons/MoneyOff"; // EMPTY
import AttachMoneyIcon from "@material-ui/icons/AttachMoney"; // FILLED
import DeleteIcon from "@material-ui/icons/Delete"; // DELETE

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
    console.log(`empty value in button :${props.emptyValue}`);
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
                onClick={props.handleEmpty}>
                {props.emptyValue ? "fulled" : "empty"}
                {props.emptyValue ? (
                    <AttachMoneyIcon className={classes.rightIcon} />
                ) : (
                    <MoneyOffIcon className={classes.rightIcon} />
                )}
            </Button>
        </Fragment>
    );
}
