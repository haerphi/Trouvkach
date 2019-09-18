import React, {Fragment, useState, useEffect, useRef} from "react";
import MapCtnr from "./map";
import TerminalCtnr from "./terminal-ctnr/terminal-ctnr";
import {Container} from "@material-ui/core";
import Description from "./description";

import SearchBar from "./search";

export default function result() {
    const modalRef = useRef(null);
    const resultsContainerRef = useRef(null);

    const [showModal, setShowModal] = useState(false);

    function handleClickOutside(event) {
        if (window.innerWidth <= 767) {
            if (modalRef.current && resultsContainerRef.current) {
                if (
                    !modalRef.current.contains(event.target) &&
                    !resultsContainerRef.current.contains(event.target)
                ) {
                    setShowModal(false);
                }
            }
        }
    }

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    });

    useEffect(() => {
        if (showModal) {
            document.querySelector("body, html").classList.add("no-scroll");
            return;
        }
        document.querySelector("body, html").classList.remove("no-scroll");
    }, [showModal]);

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

    const setItemDesc = (item, checkForModal) => {
        // this will reset the item position and the descritpion
        setItemLatitude(item.latitude);
        setItemLongitude(item.longitude);
        setItemObj(item);
        setShowModal(checkForModal);
    };

    return (
        <Fragment>
            <Container max-width={"lg"}>
                <SearchBar />
            </Container>

            <Container
                maxWidth={"lg"}
                className={"container content-container"}>
                <div className={`box-wrapper ${showModal ? "show" : ""}`}>
                    <div className={"modal-close-button"}>{"\u00D7"}</div>
                    {Handleposition() /*call to take the actual position*/}
                    <div ref={modalRef} className={"box"}>
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

            <Container
                ref={resultsContainerRef}
                maxWidth={"lg"}
                className={"results-items-box"}>
                <TerminalCtnr
                    setDesc={setItemDesc}
                    latitude={posLatitude}
                    longitude={posLongitude}
                />
            </Container>
        </Fragment>
    );
}
