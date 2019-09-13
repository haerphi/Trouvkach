import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Container from "@material-ui/core/Container";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";

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
        [theme.breakpoints.up(767)]: {
            display: "block",
        },
        [theme.breakpoints.down(450)]: {
            display: "none",
        },
    },
}));

export default function SearchAppBar() {
    const classes = useStyles();

    return (
        <AppBar id={"header"} position={"fixed"} className={classes.root}>
            <Container maxWidth={"lg"}>
                <Toolbar style={{padding: "0"}}>
                    <Typography className={classes.title} variant={"h6"} noWrap>
                        {"Trouvkach"}
                    </Typography>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
