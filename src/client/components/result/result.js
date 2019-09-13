import React, {Fragment, useState} from "react";
import MapCtnr from "./map";
import TerminalCtnr from "./terminal-ctnr/terminal-ctnr";
import {Container} from "@material-ui/core";
import Description from "./description";

import SearchBar from "./search";

export default function result() {
    const [posLatitude, setposLatitude] = useState(10.6415);
    const [posLongitude, setposLongitude] = useState(20.5721);

    const [itemLatitude, setItemLatitude] = useState(10.6412);
    const [itemLongitude, setItemLongitude] = useState(20.5718);

    const [itemObj, setItemObj] = useState({});

    const Handleposition = () => {
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
            <Container max-width={"lg"}>
                <SearchBar />
            </Container>

            <Container
                maxWidth={"lg"}
                className={"container content-container"}>
                <div className={"box-wrapper show"}>
                    {Handleposition() /*call to take the actual position*/}
                    <div className={"box"}>
                        <MapCtnr
                            latitude={posLatitude}
                            longitude={posLongitude}
                            zoom={11}
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
                <TerminalCtnr setDesc={setItemDesc} />
            </Container>
        </Fragment>
    );
}
