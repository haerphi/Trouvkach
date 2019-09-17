import React, {useState} from "react";
import InputBase from "@material-ui/core/InputBase";
import {makeStyles} from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import SearchItem from "./search-item";
import utils from "./../../../js/utils";

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

export default function SearchBar(props) {
    const [searchResult, setSearchResult] = useState("");

    const debounceValue = [null, ""];

    const classes = useStyles();

    const searchFetchAndDisplay = async () => {
        const searchedData = await utils.getcoordFromNominatim(
            debounceValue[1],
        );

        const HandleResetSearch = () => {
            debounceValue[1] = "";
            setSearchResult("");
        };

        const searchResultTemp = searchedData.features.map(item => (
            <SearchItem
                key={item.properties.geocoding.place_id}
                item={item}
                onPositionChangeByItem={props.onPositionChange}
                onResetSearch={HandleResetSearch}
            />
        ));

        setSearchResult(searchResultTemp);
    };

    const HandleInputsearch = evt => {
        /*debounce function */
        // on recupere l'evenement touche appuyée.
        // si il y a deja un timeout dans debounceValue[0], on le clear et on en remet un et on remplace la valeur de debounceValue[1] par evt.target.value
        // si il n'y en as pas, on en met un et on remplace la valeur de debounceValue[1] par evt.target.value
        // quand setTimeOut arrive a 0, on labnce le fetch

        if (debounceValue[0] == null) {
            debounceValue[1] = evt.target.value;
            debounceValue[0] = setTimeout(searchFetchAndDisplay, 1000);
        } else {
            clearTimeout(debounceValue[0]);
            debounceValue[1] = evt.target.value;
            debounceValue[0] = setTimeout(searchFetchAndDisplay, 1000);
        }
    };
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
                onInput={HandleInputsearch}
            />
            {searchResult}
        </div>
    );
}
