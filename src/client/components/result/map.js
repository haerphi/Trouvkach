import React, {useState} from "react";
import {Map, TileLayer, Marker, Popup} from "react-leaflet";

export default function mapCtnr(props) {
    /*
    const [lat, setLat] = useState(13);
    const [lng, setlng] = useState(0.59);
    const [zoom, setzoom] = useState(13);
    */

    const [lat] = useState(props.latitude);
    const [lng] = useState(props.longitude);
    const [zoom] = useState(props.zoom);

    return (
        <Map
            center={[lat, lng]}
            zoom={zoom}
            style={{
                height: "calc(50vh - 64px)",
                width: "100%",
            }}
            attributionControl={false}
            scrollWheelZoom={false}>
            <TileLayer
                attribution={
                    '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                }
                url={"https://{s}.tile.osm.org/{z}/{x}/{y}.png"}
            />
            <Marker position={[lat, lng]}>
                <Popup>{"A pretty CSS3 popup.  Easily customizable."}</Popup>
            </Marker>
            <Marker position={[13.1, lng]}>
                <Popup>{"A pretty CSS3 popup.  Easily customizable."}</Popup>
            </Marker>
            <Marker position={[lat, 0.6]}>
                <Popup>{"A pretty CSS3 popup.  Easily customizable."}</Popup>
            </Marker>
        </Map>
    );
}
