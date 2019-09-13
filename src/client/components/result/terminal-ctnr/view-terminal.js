/* eslint-disable no-unused-vars */
import React from "react";
import {ButtonBase} from "@material-ui/core";

export default function viewTerminal(props) {
    //const [modalShow, setModalShow] = useState(false);
    //
    // old modal trigger
    // const setShow = () => {
    //     setModalShow(!modalShow);
    // };
    //
    // const modal = modalShow && (
    //     <ModalItem handleClose={setShow} obj={props.obj} />
    // );

    const setdesc = () => {
        props.setdescription(props.obj);
    };

    return (
        <ButtonBase
            component={"ul"}
            className={"results-item"}
            style={{display: "block"}}>
            <li className={"item-property item-name"}>{props.obj.bank.name}</li>
            <li className={"item-property item-distance"}>
                {`distance : ${props.obj.dist.calculated}m`}
            </li>
            <li className={"item-property item-address"}>
                {props.obj.address}
            </li>
        </ButtonBase>
    );
}
