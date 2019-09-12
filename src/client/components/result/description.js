import React from "react";

export default function Description(props) {
    return (
        <div>
            {`Fucking Description!`}
            <div>{props.obj.address && props.obj.address}</div>
            <div>{props.obj.bank && props.obj.bank.name}</div>
            <div>{`${props.obj.dist && props.obj.dist.calculated} m`}</div>
        </div>
    );
}
