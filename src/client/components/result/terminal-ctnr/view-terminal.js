import React from "react";
//import ModalItem from "./../../item/item";

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
        //<div {onClick={setShow}> => old modal trigguer
        <div onClick={setdesc}>
            <div>{props.obj.address}</div>
            <div>{props.obj.bank.name}</div>
            <div>{`distance : ${props.obj.dist.calculated}m`}</div>
        </div>
    );
}
