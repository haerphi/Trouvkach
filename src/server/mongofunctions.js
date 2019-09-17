const mongo = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;

//A MODIFIER
const url = `mongodb+srv://dev:dev@haerphi-trouvkash-jyzbr.mongodb.net/test?retryWrites=true&w=majority`;
//const url = "mongodb://dev:dev@mongo:27017";

export const mongoRequestBanks = async () => {
    const client = await mongo.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    const db = client.db("trouvkash");
    const collection = db.collection("banks");

    const banks = await collection.find({}).toArray();

    client.close();

    const rep = {
        truc: banks,
    };
    return rep;
};

export const mongoRequestZoom = async (long, lat, dist) => {
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

    client.close();

    const rep = {
        truc: items,
    };
    return rep;
};

export const mongomodify = async (id, champ, value) => {
    console.log(`Modify : ${id} -> ${champ} = ${value}`);

    const client = await mongo.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    const db = client.db("trouvkash");
    const collection = db.collection("terminals");

    const modify = {};
    modify[champ] = value;
    console.log(modify);
    collection.updateOne({_id: ObjectId(id)}, {$set: modify});

    const rep = {
        truc: "Modification effectuée (enfin peux-être)",
    };
    return rep;
};
