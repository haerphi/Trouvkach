/* becodeorg/trouvkach
 *
 * /src/server/index.js - Server entry point
 *
 * coded by leny@BeCode
 * started at 06/09/2019
 */

import express from "express";
import path from "path";
const mongo = require("mongodb").MongoClient;

const {APP_PORT} = process.env;

const url = "mongodb://dev:dev@mongo:27017";

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
            },
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
            },
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
            },
        ],
    };
    res.send(rep);
});

app.post("/api/search/:longitude/:latitude/:offset/:limit", (req, res) => {
    console.log(
        `${req.params.longitude} : ${req.params.latitude} - ${req.params.offset} -> ${req.params.limit}`,
    );

    let rep = {
        data: "In construct",
    };

    //requête mongo
    mongo.connect(
        url,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
        (err, client) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log("sucess");
            const db = client.db("trouvkash");
            const collection = db.collection("banks");
            collection.find({}).toArray((err2, items) => {
                console.log(items);
                rep = {
                    data: items,
                };
                res.send(rep);
                client.close();
            });
        },
    );
});

app.listen(APP_PORT, () =>
    console.log(`🚀 Server is listening on port ${APP_PORT}.`),
);
