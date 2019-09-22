import React from "react";
import L from "leaflet";
import {Map, TileLayer, Marker, Popup} from "react-leaflet";
import BanksMarkerIconShadow from "../../images/icons/banks-marker-icon-shadow.png";

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

    let AllAtm;
    if (props.list) {
        AllAtm = props.list.map(elem => {
            const BanksMarker = new L.divIcon({
                iconSize: new L.Point(32, 38),
                shadowUrl: BanksMarkerIconShadow,
                shadowSize: [32, 32],
                shadowAnchor: new L.Point(9, 12),
                className: "leaflet-marker-icon",
                html: `<?xml version="1.0" ?><svg height="24" version="1.1" width="24" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"><g transform="translate(0 -1028.4)"><path d="m12 0c-4.4183 2.3685e-15 -8 3.5817-8 8 0 1.421 0.3816 2.75 1.0312 3.906 0.1079 0.192 0.221 0.381 0.3438 0.563l6.625 11.531 6.625-11.531c0.102-0.151 0.19-0.311 0.281-0.469l0.063-0.094c0.649-1.156 1.031-2.485 1.031-3.906 0-4.4183-3.582-8-8-8zm0 4c2.209 0 4 1.7909 4 4 0 2.209-1.791 4-4 4-2.2091 0-4-1.791-4-4 0-2.2091 1.7909-4 4-4z" fill=#${
                    elem.bank ? elem.bank.color : "26a69a"
                } transform="translate(0 1028.4)"/><path d="m12 3c-2.7614 0-5 2.2386-5 5 0 2.761 2.2386 5 5 5 2.761 0 5-2.239 5-5 0-2.7614-2.239-5-5-5zm0 2c1.657 0 3 1.3431 3 3s-1.343 3-3 3-3-1.3431-3-3 1.343-3 3-3z" fill=#${
                    elem.bank ? elem.bank.color : "26a69a"
                } transform="translate(0 1028.4)"/></g></svg>`,
            });
            return (
                <Marker
                    icon={BanksMarker}
                    key={elem._id}
                    position={[elem.latitude, elem.longitude]}>
                    <Popup>{elem.bank && elem.bank.name}</Popup>
                </Marker>
            );
        });
    }

    return (
        <div className={"leaflet-map-container"}>
            <Map
                id={"leaflet-map"}
                center={[lat, lng]}
                zoom={zoom}
                maxZoom={19}
                style={{
                    height: "100%",
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
                {AllAtm}
                <Marker position={[lat, lng]}>
                    <Popup>{"Your Position"}</Popup>
                </Marker>
                <Marker
                    position={[props.onitemLatitude, props.onitemLongitude]}>
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
        </div>
    );
}
