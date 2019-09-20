const mongo = require("mongodb").MongoClient;
//A MODIFIER
const urlRemote = `mongodb+srv://dev:dev@haerphi-trouvkash-jyzbr.mongodb.net/test?retryWrites=true&w=majority`;
const urlLocal = "mongodb://dev:dev@localhost:27017";

const updateBD = async url => {
    const client = await mongo.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    const db = client.db("trouvkash");
    //récupération de la collection
    const collection = db.collection("terminals");
    const items = await collection.find({}).toArray();
    for (const [i, element] of items.entries()) {
        element.location = {
            type: "Point",
            coordinates: [element.longitude, element.latitude],
        };
        collection.updateOne({_id: element._id}, {$set: element});
    }
    await collection.createIndex({location: "2dsphere"});
    client.close();
};

const verify = async url => {
    const client = await mongo.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    const db = client.db("trouvkash");
    const collection1 = db.collection("terminals");
    const items = await collection1
        .find({})
        .limit(1)
        .toArray();
    if (!Object.prototype.hasOwnProperty.call(items[0], "location")) {
        updateBD(url);
    }
    client.close();
};

const index = async url => {
    const client = await mongo.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    const db = client.db("trouvkash");
    const collection = db.collection("terminals");
    await collection.createIndex({location: "2dsphere"});

    client.close();
};

const remoteOrLocal = process.argv[2];
const choix = process.argv[3];

let uri = urlRemote;
if (typeof remoteOrLocal != "undefined") {
    if (remoteOrLocal.toLocaleLowerCase() === "l") {
        uri = urlLocal;
    }
}
if (typeof choix != "undefined") {
    if (choix === "index") {
        index(uri);
    }
} else {
    verify(uri);
}
