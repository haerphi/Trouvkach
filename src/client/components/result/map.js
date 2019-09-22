import React from "react";
import L from "leaflet";
import {Map, TileLayer, Marker, Popup} from "react-leaflet";
import {makeStyles} from "@material-ui/styles";
import BanksMarkerIcon from "../../images/icons/banks-marker-icon.svg";
import BanksMarkerIconShadow from "../../images/icons/banks-marker-icon-shadow.png";

const bankMarkersStyle = makeStyles({
    default: {
        filter:
            "invert(51%) sepia(94%) saturate(335%) hue-rotate(125deg) brightness(90%) contrast(90%)",
    },
    argenta: {
        filter:
            "invert(72%) sepia(80%) saturate(5318%) hue-rotate(64deg) brightness(88%) contrast(77%)",
    },
    axa: {
        filter:
            "invert(10%) sepia(82%) saturate(3506%) hue-rotate(224deg) brightness(101%) contrast(98%)",
    },
    belfius: {
        filter:
            "invert(15%) sepia(99%) saturate(4524%) hue-rotate(331deg) brightness(74%) contrast(109%)",
    },
    beobank: {
        filter:
            "invert(16%) sepia(94%) saturate(6612%) hue-rotate(348deg) brightness(85%) contrast(111%)",
    },
    bpost: {
        filter:
            "invert(13%) sepia(53%) saturate(4441%) hue-rotate(202deg) brightness(90%) contrast(102%)",
    },
    crelan: {
        filter:
            "invert(34%) sepia(69%) saturate(5148%) hue-rotate(136deg) brightness(96%) contrast(101%)",
    },
    cbc: {
        filter:
            "invert(66%) sepia(98%) saturate(4260%) hue-rotate(165deg) brightness(100%) contrast(98%)",
    },
    kbc: {
        filter:
            "invert(66%) sepia(98%) saturate(4260%) hue-rotate(165deg) brightness(100%) contrast(98%)",
    },
    keytrade: {
        filter:
            "invert(15%) sepia(59%) saturate(1503%) hue-rotate(180deg) brightness(89%) contrast(107%)",
    },
    bnp_paribas: {
        filter:
            "invert(33%) sepia(96%) saturate(1984%) hue-rotate(147deg) brightness(94%) contrast(103%)",
    },
    ing: {
        filter:
            "invert(50%) sepia(66%) saturate(1903%) hue-rotate(358deg) brightness(102%) contrast(110%)",
    },
    bkcp: {
        filter:
            "invert(19%) sepia(99%) saturate(1552%) hue-rotate(198deg) brightness(95%) contrast(91%)",
    },
    delta_lioyd: {
        filter:
            "invert(50%) sepia(74%) saturate(3781%) hue-rotate(167deg) brightness(96%) contrast(101%)",
    },
    deutsche: {
        filter:
            "invert(14%) sepia(69%) saturate(3088%) hue-rotate(201deg) brightness(92%) contrast(103%)",
    },
});

export default function mapCtnr(props) {
    const banks = bankMarkersStyle();

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
            const BanksMarker = new L.Icon({
                iconUrl: BanksMarkerIcon,
                iconSize: new L.Point(32, 38),
                shadowUrl: BanksMarkerIconShadow,
                shadowSize: [32, 32],
                shadowAnchor: new L.Point(9, 12),
                className: elem.bank
                    ? elem.bank.color.toLowerCase() === "4a961d"
                        ? banks.argenta
                        : elem.bank.color.toLowerCase() === "0b2c81"
                        ? banks.axa
                        : elem.bank.color.toLowerCase() === "c30045"
                        ? banks.belfius
                        : elem.bank.color.toLowerCase() === "e20019"
                        ? banks.beobank
                        : elem.bank.color.toLowerCase() === "003776"
                        ? banks.bpost
                        : elem.bank.color.toLowerCase() === "009639"
                        ? banks.crelan
                        : elem.bank.color.toLowerCase() === "02acef"
                        ? banks.cbc
                        : elem.bank.color.toLowerCase() === "02acef"
                        ? banks.kbc
                        : elem.bank.color.toLowerCase() === "002C52"
                        ? banks.keytrade
                        : elem.bank.color.toLowerCase() === "009b7a"
                        ? banks.bnp_paribas
                        : elem.bank.color.toLowerCase() === "ff7f00"
                        ? banks.ing
                        : elem.bank.color.toLowerCase() === "10519b"
                        ? banks.bkcp
                        : elem.bank.color.toLowerCase() === "009fda"
                        ? banks.delta_lioyd
                        : elem.bank.color.toLowerCase() === "003777" &&
                          banks.deutsche
                    : banks.default,
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
