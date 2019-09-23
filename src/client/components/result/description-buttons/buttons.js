import React, {Fragment} from "react";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import MoneyOffIcon from "@material-ui/icons/MoneyOff"; // EMPTY
import AttachMoneyIcon from "@material-ui/icons/AttachMoney"; // FILLED
import DeleteIcon from "@material-ui/icons/Delete"; // DELETE
import RestoreFromTrashIcon from "@material-ui/icons/RestoreFromTrash"; // UNDELETE

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
    return (
        <Fragment>
            <Button
                variant={"contained"}
                color={props.deleteValue ? "primary" : "secondary"}
                onClick={props.handleDelete}
                className={classes.button}>
                {props.deleteValue ? "undelete" : "delete"}
                {props.deleteValue ? (
                    <RestoreFromTrashIcon className={classes.rightIcon} />
                ) : (
                    <DeleteIcon className={classes.rightIcon} />
                )}
            </Button>
            <Button
                variant={"contained"}
                color={"primary"}
                disabled={props.deleteValue}
                className={classes.button}
                onClick={props.handleEmpty}>
                {props.emptyValue ? "filled" : "empty"}
                {props.emptyValue ? (
                    <AttachMoneyIcon className={classes.rightIcon} />
                ) : (
                    <MoneyOffIcon className={classes.rightIcon} />
                )}
            </Button>
        </Fragment>
    );
}
