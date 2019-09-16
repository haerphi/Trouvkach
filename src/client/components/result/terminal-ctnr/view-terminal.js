/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from "react";
import {ButtonBase} from "@material-ui/core";

export default function viewTerminal(props) {
    const setdesc = () => {
        props.setdescription(props.obj);
        console.log(`obj clicked =>`);
        console.log(props.obj);
    };

    // si je recois une string dans props.obj.adress alors j'ai l'adress. je l'ecris
    // sinon, c'est une promise, je l'insere dans un un state, je fait un useeffect et des que la promise change de pending a quelquechose, j'affiche ce quelquechose via le useeffect ( le state est immutable)
    const [address, setAddress] = useState(props.obj.address);

    if (typeof props.obj.address != "string") {
        useEffect(() => {
            (async () => {
                const adressTemp = await JSON.stringify(
                    await props.obj.address,
                );
                setAddress(adressTemp);
            })();
        }, [props.obj.address]);
    }
    return (
        <ButtonBase
            component={"ul"}
            className={"results-item"}
            style={{display: "block"}}
            onClick={setdesc}>
            <li>{props.obj.bank ? props.obj.bank.name : `Unknow Bank`}</li>
            <li>
                {typeof address == "string"
                    ? address
                    : `Address Loading, please wait.`}
            </li>
            <li>{`distance : ${Math.trunc(props.obj.dist.calculated)}m`}</li>
            {console.log("Rendu terminal item")}
        </ButtonBase>
    );
}
