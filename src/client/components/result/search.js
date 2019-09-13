import React from "react";
import InputBase from "@material-ui/core/InputBase";
import {makeStyles} from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: "#26a69a",
    },
    searchIcon: {
        width: theme.spacing(7),
        height: "100%",
        position: "absolute",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
    },
    inputRoot: {
        color: "#fff",
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up(767)]: {
            width: 180,
            "&:focus": {
                width: 260,
            },
        },
    },
}));

export default function SearchBar() {
    const classes = useStyles();

    return (
        <div className={"search-input-container"}>
            <div className={classes.searchIcon}>
                <SearchIcon />
            </div>
            <InputBase
                placeholder={"Search…"}
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                className={"search-input no-select"}
                inputProps={{"aria-label": "search"}}
            />
        </div>
    );
}
