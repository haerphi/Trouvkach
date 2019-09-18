import React from "react";
import {Map, TileLayer, Marker, Popup} from "react-leaflet";

export default function mapCtnr(props) {
    /*
    const [lat, setLat] = useState(13);
    const [lng, setlng] = useState(0.59);
    const [zoom, setzoom] = useState(13);
    */

    const lat = props.latitude;
    const lng = props.longitude;
    const zoom = props.zoom;

    // action that triggered when the card is zoomed
    const horatioKayne = evt => {
        props.onZoom(evt.target._zoom);
    };

    return (
        <Map
            id={"leaflet-map"}
            center={[lat, lng]}
            zoom={zoom}
            maxZoom={19}
            style={{
                height: "calc(50vh - 64px)",
                width: "100%",
            }}
            attributionControl={false}
            onZoom={horatioKayne}>
            <TileLayer
                attribution={
                    '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                }
                url={"https://{s}.tile.osm.org/{z}/{x}/{y}.png"}
            />
            <Marker position={[lat, lng]}>
                <Popup>{"Your Position"}</Popup>
            </Marker>
            <Marker position={[props.onitemLatitude, props.onitemLongitude]}>
                <Popup>
                    {`${props.obj.address} - ${(() => {
                        if (typeof props.obj.bank != "undefined") {
                            return props.obj.bank.name;
                        }
                        return "Unknow bank";
                    })()}`}
                </Popup>
            </Marker>
        </Map>
    );
}
