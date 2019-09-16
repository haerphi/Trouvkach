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
} from "./mongofunctions";

//fonctionne avec docker-compose up
const {APP_PORT} = process.env;
let port = APP_PORT;
//devient undefined une fois déployer sur heroku
if (typeof port === "undefined") {
    port = process.env.PORT;
}

const app = express();

app.use(express.static(path.resolve(__dirname, "../../bin/client")));

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

app.post("/api/search/banks/", (req, res) => {
    console.log(`Banks`);

    //requête mongo
    mongoRequestBanks().then(rep => {
        res.send(rep);
    });
});

app.post("/api/modify/:id/:champ/:value", (req, res) => {
    mongomodify(req.params.id, req.params.champ, req.params.value).then(rep => {
        res.send(rep);
    });
});

app.listen(port, () => console.log(`🚀 Server is listening on port ${port}.`));
