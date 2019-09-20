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
            {$limit: 5000},
        ])
        .toArray();

    client.close();

    const rep = {
        truc: items,
    };
    return rep;
};

export const mongomodify = async (id, champ, value) => {
    if (id !== "undefined" && value !== "undefined") {
        let newValue = value;
        if (newValue === "true") {
            newValue = true;
        } else if (newValue === "false") {
            newValue = false;
        }

        const client = await mongo.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        const db = client.db("trouvkash");
        const collection = db.collection("terminals");

        const modify = {};
        modify[champ] = newValue;
        collection.updateOne({_id: ObjectId(id)}, {$set: modify});

        client.close();

        const rep = {
            truc: "Modification effectuée (enfin peux-être)",
        };
        return rep;
    }
    const rep = {
        truc: "id undefined",
    };
    return rep;
};

export const newTerminal = async (long, lat, bank) => {
    const client = await mongo.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    const db = client.db("trouvkash");
    const collection = db.collection("terminals");

    //insert
    const newElement = {
        bank: ObjectId(bank),
        latitude: parseFloat(lat),
        longitude: parseFloat(long),
        address: null, //Will be update by the app
        created_at: "today", //todo
        updated_at: "today", //todo
        deleted_at: null,
        location: {
            type: "Point",
            coordinates: [parseFloat(long), parseFloat(lat)],
        },
    };
    await collection.insertOne(newElement);
    await collection.createIndex({location: "2dsphere"});

    client.close();

    const rep = {
        truc: "Modification effectuée (enfin peux-être)",
    };
    return rep;
};
