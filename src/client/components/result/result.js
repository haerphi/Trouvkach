import React, {Fragment, useState} from "react";
import MapCtnr from "./map";
import TerminalCtnr from "./terminal-ctnr/terminal-ctnr";
import {Container} from "@material-ui/core";
import Description from "./description";

export default function result() {
    const [posLatitude, setposLatitude] = useState(10.6415);
    const [posLongitude, setposLongitude] = useState(20.5721);

    const [itemLatitude, setItemLatitude] = useState(10.6412);
    const [itemLongitude, setItemLongitude] = useState(20.5718);

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

    const setItemDesc = item => {
        // this will reset the item position and the descritpion
        setItemLatitude(item.latitude);
        setItemLongitude(item.longitude);
        setItemObj(item);
    };

    return (
        <Fragment>
            {console.log("Rendu result")}
            {Handleposition() /*call to take the actual position*/}
            <MapCtnr
                latitude={posLatitude}
                longitude={posLongitude}
                zoom={11}
                onposition={Handleposition}
                onitemLatitude={itemLatitude}
                onitemLongitude={itemLongitude}
                obj={itemObj}
            />
            <Container className={"container content-container"}>
                <TerminalCtnr
                    setDesc={setItemDesc}
                    latitude={posLatitude}
                    longitude={posLongitude}
                />
                <Description obj={itemObj} />
            </Container>
        </Fragment>
    );
}
