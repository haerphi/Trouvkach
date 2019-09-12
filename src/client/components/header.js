import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Container from "@material-ui/core/Container";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import {fade, makeStyles} from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: "#26a69a",
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        display: "none",
        [theme.breakpoints.up("sm")]: {
            display: "block",
        },
    },
    search: {
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade("#000", 0.15),
        "&:hover": {
            backgroundColor: fade("#000", 0.25),
        },
        marginLeft: 0,
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            marginLeft: theme.spacing(1),
            width: "auto",
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: "100%",
        position: "absolute",
        pointerEvents: "all",
        zIndex: "10",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    inputRoot: {
        color: "inherit",
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            width: 120,
            "&:focus": {
                width: 200,
            },
        },
    },
}));

export default function SearchAppBar() {
    const classes = useStyles();

    return (
        <AppBar id={"header"} position={"fixed"} className={classes.root}>
            <Container maxWidth={"lg"}>
                <Toolbar>
                    <Typography className={classes.title} variant={"h6"} noWrap>
                        {"Trouvkach"}
                    </Typography>
                    <div className={classes.search}>
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
                </Toolbar>
            </Container>
        </AppBar>
    );
}
