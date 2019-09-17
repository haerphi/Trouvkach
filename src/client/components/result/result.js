import React, {Fragment, useState, useEffect} from "react";
import MapCtnr from "./map";
import TerminalCtnr from "./terminal-ctnr/terminal-ctnr";
import {Container} from "@material-ui/core";
import Description from "./description";

import SearchBar from "./search/search";

export default function result() {
    const [posLatitude, setposLatitude] = useState(-181);
    const [posLongitude, setposLongitude] = useState(-181);

    const [itemLatitude, setItemLatitude] = useState(-181);
    const [itemLongitude, setItemLongitude] = useState(-181);

    const [itemObj, setItemObj] = useState({});

    const Handleposition = () => {
        // va rechercher la poisiton en async
        navigator.geolocation.getCurrentPosition(
            position => {
                setposLatitude(position.coords.latitude);
                setposLongitude(position.coords.longitude);
            },
            error => console.warn(error.message),
            {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000},
        );
    };

    useEffect(() => {
        Handleposition();
    }, []);

    const HandleSearchedPosition = NewAdressSearched => {
        console.log(`new pos`);
        setposLatitude(NewAdressSearched.geometry.coordinates[1]);
        setposLongitude(NewAdressSearched.geometry.coordinates[0]);
    };

    const setItemDesc = item => {
        // this will reset the item position and the descritpion
        setItemLatitude(item.latitude);
        setItemLongitude(item.longitude);
        setItemObj(item);
    };

    return (
        <Fragment>
            <Container max-width={"lg"}>
                <SearchBar onPositionChange={HandleSearchedPosition} />
            </Container>

            <Container
                maxWidth={"lg"}
                className={"container content-container"}>
                <div className={"box-wrapper"}>
                    <div className={"box-modal-close-button"}>{"\u00D7"}</div>
                    <div className={"box"}>
                        <MapCtnr
                            latitude={posLatitude}
                            longitude={posLongitude}
                            zoom={16}
                            onposition={Handleposition}
                            onitemLatitude={itemLatitude}
                            onitemLongitude={itemLongitude}
                            obj={itemObj}
                        />
                        <Description obj={itemObj} />
                    </div>
                </div>
            </Container>

            <Container maxWidth={"lg"} className={"results-items-box"}>
                <TerminalCtnr
                    setDesc={setItemDesc}
                    latitude={posLatitude}
                    longitude={posLongitude}
                />
            </Container>
        </Fragment>
    );
}
