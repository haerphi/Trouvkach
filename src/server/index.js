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
    mongoRequestZoom,
    mongoRequestBanks,
    mongomodify,
    newTerminal,
} from "./mongofunctions";

const {APP_PORT, PORT} = process.env;
const port = APP_PORT || PORT;

const app = express();

app.use(express.static(path.resolve(__dirname, "../../bin/client")));

app.post("/api/search/:longitude/:latitude/:zoom", (req, res) => {
    console.log(`Zoom`);
    mongoRequestZoom(
        req.params.longitude,
        req.params.latitude,
        req.params.zoom,
    ).then(rep => {
        res.send(rep);
    });
});

app.post("/api/search/banks/", (req, res) => {
    console.log(`Banks`);
    mongoRequestBanks().then(rep => {
        res.send(rep);
    });
});

app.post("/api/modify/:id/:champ/:value", (req, res) => {
    console.log("Modify");
    mongomodify(req.params.id, req.params.champ, req.params.value).then(rep => {
        res.send(rep);
    });
});

app.post("/api/newTerminal/:long/:lat/:bank", (req, res) => {
    console.log("New Terminal");
    newTerminal(req.params.long, req.params.lat, req.params.bank).then(rep => {
        res.send(rep);
    });
});

app.listen(port, () => console.log(`🚀 Server is listening on port ${port}.`));
