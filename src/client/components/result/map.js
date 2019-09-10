import React, {useState} from "react";
import {Map, TileLayer, Marker, Popup} from "react-leaflet";

export default function mapCtnr() {
    /*
    const [lat, setLat] = useState(13);
    const [lng, setlng] = useState(0.59);
    const [zoom, setzoom] = useState(13);
    */

    const [lat] = useState(13);
    const [lng] = useState(0.59);
    const [zoom] = useState(13);

    return (
        <Map
            center={[lat, lng]}
            zoom={zoom}
            style={{height: "200px", width: "200px"}}>
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

/* 
import React, {Component} from "react";
import {Map, TileLayer, Marker, Popup} from "react-leaflet";

export default class MaMap extends Component {
    constructor(props) {
        super(props);
        this.userLat = 13;
        this.userLng = 0.59;
        this.zoom = 6;
        this.userPosition = [this.userLat, this.userLng];
    }

    render() {
        const styleMap = {
            height: "500px",
            width: "500px",
        };
        return (
            <Map center={this.userPosition} zoom={this.zoom} style={styleMap}>
                <TileLayer
                    attribution={
                        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    }
                    url={"https://{s}.tile.osm.org/{z}/{x}/{y}.png"}
                />
                <Marker position={this.userPosition}>
                    <Popup>
                        {"A pretty CSS3 popup.  Easily customizable."}
                    </Popup>
                </Marker>
            </Map>
        );
    }
}

*/
