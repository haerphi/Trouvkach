import React from "react";
import ReactDOM from "react-dom";
import MapCtnr from "./../result/map";

export default function item(props) {
    return ReactDOM.createPortal(
        <div onClick={props.handleClose}>
            <MapCtnr
                latitude={props.obj.location.coordinates[0]}
                longitude={props.obj.location.coordinates[1]}
                zoom={13}
            />
            <div>{props.obj.address}</div>
            <div>{props.obj.bank.name}</div>
            <div>{`${props.obj.dist.calculated} m`}</div>
        </div>,
        document.querySelector("#ModalItemInfo"),
    );
}
