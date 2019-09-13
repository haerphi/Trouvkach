const mongo = require("mongodb").MongoClient;
const url = "mongodb://dev:dev@mongo:27017";

const updateBD = async () => {
    console.log("UPDATE de la BD");
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
        console.log(element);
        console.log(i);
        collection.updateOne({_id: element._id}, {$set: element});
    }
    await collection.createIndex({location: "2dsphere"});
    client.close();
};

const verify = async () => {
    console.log("VERIFY de la BD");
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
        updateBD();
    }
    client.close();
};

verify();
