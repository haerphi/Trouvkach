/* becodeorg/trouvkach
 *
 * /src/server/index.js - Server entry point
 *
 * coded by leny@BeCode
 * started at 06/09/2019
 */

import express from "express";
import path from "path";

const {APP_PORT} = process.env;

const app = express();

app.use(express.static(path.resolve(__dirname, "../../bin/client")));

app.get("/api/test", (req, res) => {
    console.log(`ℹ️  (${req.method.toUpperCase()}) ${req.url}`);
    const rep = {
        truc: [
            {
                _id: {$oid: "5393803ce0b8c05979c6ea65"},
                bank: {$oid: "53937660e0b8c05979c6ea55"},
                latitude: 51.1069,
                longitude: 2.64824,
                address: "Zeelaan 67, 8670 Koksijde",
                created_at: "2013-06-10 18:43:44",
                updated_at: "2013-06-10 18:43:44",
                deleted_at: null,
            },
            {
                _id: {$oid: "5393803ce0b8c05979c6ea65"},
                bank: {$oid: "53937660e0b8c05979c6ea55"},
                latitude: 51.1069,
                longitude: 2.64824,
                address: "Zeelaan 67, 8670 Koksijde",
                created_at: "2013-06-10 18:43:44",
                updated_at: "2013-06-10 18:43:44",
                deleted_at: null,
            },
            {
                _id: {$oid: "5393803ce0b8c05979c6ea65"},
                bank: {$oid: "53937660e0b8c05979c6ea55"},
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

app.listen(APP_PORT, () =>
    console.log(`🚀 Server is listening on port ${APP_PORT}.`),
);
