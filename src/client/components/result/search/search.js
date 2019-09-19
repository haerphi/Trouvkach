import React, {useState, useEffect, useRef} from "react";
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
        color: "rgba(0, 0, 0, 0.85)",
    },
    inputRoot: {
        display: "block",
        color: "rgba(0, 0, 0, 0.85)",
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        width: "calc(100% - 64px)",
    },
}));

export default function SearchBar(props) {
    const searchResultsContainerRef = useRef(null);
    const [showSearchResults, setShowSearchResults] = useState(false);

    const [searchResult, setSearchResult] = useState("");

    function handleClickOutside(event) {
        if (
            searchResultsContainerRef.current &&
            searchResultsContainerRef.current.contains(event.target)
        ) {
            setShowSearchResults(true);
        } else {
            setShowSearchResults(false);
        }
    }

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    });

    const debounceValue = [null, ""];

    const classes = useStyles();

    const searchFetchAndDisplay = async () => {
        const searchedData = await utils.getcoordFromNominatim(
            debounceValue[1],
        );

        const HandleResetSearch = () => {
            debounceValue[1] = "";
            setSearchResult("");
            setShowSearchResults(false);
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
            setShowSearchResults(true);
        } else {
            clearTimeout(debounceValue[0]);
            debounceValue[1] = evt.target.value;
            debounceValue[0] = setTimeout(searchFetchAndDisplay, 1000);
            setShowSearchResults(true);
        }
    };
    return (
        <div className={"search-input-wrapper"}>
            <div
                ref={searchResultsContainerRef}
                className={`search-input-container ${
                    showSearchResults ? "show-results" : ""
                }`}>
                <div className={classes.searchIcon}>
                    <SearchIcon />
                </div>
                <InputBase
                    placeholder={"Search by address..."}
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    className={"search-input no-select"}
                    inputProps={{"aria-label": "search"}}
                    onInput={HandleInputsearch}
                />
                <ul className={"search-results"}>{searchResult}</ul>
            </div>
        </div>
    );
}
