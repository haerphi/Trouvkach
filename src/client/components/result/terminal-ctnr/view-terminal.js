/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from "react";
import {ButtonBase} from "@material-ui/core";

export default function viewTerminal(props) {
    // si je recois une string dans props.obj.adress alors j'ai l'adress. je l'ecris
    // sinon, c'est une promise, je l'insere dans un un state, je fait un useeffect et des que la promise change de pending a quelquechose, j'affiche ce quelquechose via le useeffect ( le state est immutable)
    const [address, setAddress] = useState(props.obj.address);
    const [active, setActive] = useState(props.isActive);

    useEffect(() => {
        setActive(props.isActive);
    }, [props.isActive]);

    if (typeof props.obj.address != "string") {
        useEffect(() => {
            (async () => {
                const adressTemp = await address;
                setAddress(adressTemp);
            })();
        }, [props.obj.address]);
    }

    const setdesc = () => {
        props.obj.address = address;
        props.setdescription(props.obj, true);
        props.setIsActive();
    };

    return (
        <ButtonBase
            component={"ul"}
            className={`results-item ${active ? "active" : ""} ${
                props.obj.delete ? "deleted-item" : ""
            }`}
            style={{display: "block"}}
            onClick={setdesc}>
            <li
                className={"item-property item-name"}
                style={{
                    color: `${props.obj.bank &&
                        `#${
                            props.obj.bank.color
                                ? props.obj.bank.color
                                : "26a69a"
                        }`}`,
                }}>
                {props.obj.bank ? props.obj.bank.name : `Unknow Bank`}
            </li>
            <li className={"item-property item-distance"}>
                {`distance: ${Math.trunc(props.obj.dist.calculated)}m`}
            </li>
            <li id={props.obj._id} className={"item-property item-address"}>
                {typeof address == "string"
                    ? `${address}`
                    : `Address Loading, please wait.`}
            </li>
        </ButtonBase>
    );
}
