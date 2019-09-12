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

export const verify = async () => {
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

export const mongoRequest = async (long, lat, offset, limit) => {
    console.log(long, lat, offset, limit);
    const client = await mongo.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    const db = client.db("trouvkash");
    const collection = db.collection("terminals");

    const items = await collection
        .find({})
        .skip(parseInt(offset))
        .limit(parseInt(limit))
        .toArray();
    console.log(items);

    client.close();

    const rep = {
        truc: items,
    };
    return rep;
};

export const mongoRequestZoom = async (long, lat, dist) => {
    console.log(parseFloat(long), parseFloat(lat), parseInt(dist));
    const client = await mongo.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    const db = client.db("trouvkash");
    const collection = db.collection("terminals");

    const items = await collection
        .aggregate([
            {
                $geoNear: {
                    near: {
                        type: "Point",
                        coordinates: [parseFloat(long), parseFloat(lat)],
                    },
                    distanceField: "dist.calculated",
                    maxDistance: parseInt(dist),
                },
            },
        ])
        .toArray();
    console.log(items);

    client.close();

    const rep = {
        truc: items,
    };
    return rep;
};
