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
            className={"results-list-item"}
            style={{display: "block"}}>
            <li>{props.obj.bank.name}</li>
            <li>{props.obj.address}</li>
            <li>{`distance : ${props.obj.dist.calculated}m`}</li>
        </ButtonBase>
    );
}
