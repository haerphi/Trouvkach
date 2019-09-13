/* becodeorg/trouvkach
 *
 * /src/server/index.js - Server entry point
 *
 * coded by leny@BeCode
 * started at 06/09/2019
 */

import express from "express";
import path from "path";
import {
    verify,
    mongoRequest,
    mongoRequestZoom,
    mongoRequestBanks,
} from "./mongofunctions";

const {APP_PORT} = process.env;

verify();

const app = express();

app.use(express.static(path.resolve(__dirname, "../../bin/client")));

app.post("/api/test/search/", (req, res) => {
    console.log(`ℹ️  (${req.method.toUpperCase()}) ${req.url}`);
    const rep = {
        truc: [
            {
                _id: {$oid: "5393803ce0b8c05979c6ea65"},
                bank: {
                    _id: {$oid: "53937660e0b8c05979c6ea55"},
                    country: "BE",
                    color: "4a961d",
                    name: "Argenta",
                    icon: "argenta.png",
                    url: "http://www.argenta.be",
                    created_at: "2013-06-06 20:40:38",
                    updated_at: "2013-06-06 20:40:38",
                    deleted_at: null,
                },
                latitude: 51.1069,
                longitude: 2.64824,
                address: "Zeelaan 67, 8670 Koksijde",
                created_at: "2013-06-10 18:43:44",
                updated_at: "2013-06-10 18:43:44",
                deleted_at: null,
                location: {
                    type: "Point",
                    coordinates: [51.2159, 2.89],
                },
                dist: {
                    calculated: 0,
                },
            },
            {
                _id: {$oid: "5393803ce0b8c05979c6ea65"},
                bank: {
                    _id: {$oid: "53937660e0b8c05979c6ea55"},
                    country: "BE",
                    color: "4a961d",
                    name: "gnagnagna",
                    icon: "argenta.png",
                    url: "http://www.argenta.be",
                    created_at: "2013-06-06 20:40:38",
                    updated_at: "2013-06-06 20:40:38",
                    deleted_at: null,
                },
                latitude: 51.1069,
                longitude: 2.64824,
                address: "Zeelaan 67, 8670 Koksijde",
                created_at: "2013-06-10 18:43:44",
                updated_at: "2013-06-10 18:43:44",
                deleted_at: null,
                location: {
                    type: "Point",
                    coordinates: [51.2159, 2.89],
                },
                dist: {
                    calculated: 0,
                },
            },
            {
                _id: {$oid: "5393803ce0b8c05979c6ea65"},
                bank: {
                    _id: {$oid: "53937660e0b8c05979c6ea55"},
                    country: "BE",
                    color: "4a961d",
                    name: "maBite",
                    icon: "argenta.png",
                    url: "http://www.argenta.be",
                    created_at: "2013-06-06 20:40:38",
                    updated_at: "2013-06-06 20:40:38",
                    deleted_at: null,
                },
                latitude: 51.1069,
                longitude: 2.64824,
                address: "Zeelaan 67, 8670 Koksijde",
                created_at: "2013-06-10 18:43:44",
                updated_at: "2013-06-10 18:43:44",
                deleted_at: null,
                location: {
                    type: "Point",
                    coordinates: [51.2159, 2.89],
                },
                dist: {
                    calculated: 0,
                },
            },
        ],
    };
    res.send(rep);
});

app.post("/api/search/:longitude/:latitude/:zoom", (req, res) => {
    console.log(`Zoom`);

    //requête mongo
    mongoRequestZoom(
        req.params.longitude,
        req.params.latitude,
        req.params.zoom,
    ).then(rep => {
        res.send(rep);
    });
});

app.post("/api/search/:longitude/:latitude/:offset/:limit", (req, res) => {
    console.log(`Offset and limit`);

    //requête mongo
    mongoRequest(
        req.params.longitude,
        req.params.latitude,
        req.params.offset,
        req.params.limit,
    ).then(rep => {
        res.send(rep);
    });
});

app.post("/api/search/banks/", (req, res) => {
    console.log(`Banks`);

    //requête mongo
    mongoRequestBanks().then(rep => {
        res.send(rep);
    });
});

app.listen(APP_PORT, () =>
    console.log(`🚀 Server is listening on port ${APP_PORT}.`),
);