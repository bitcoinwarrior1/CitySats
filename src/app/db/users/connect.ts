import 'dotenv';
import { MongoClient } from 'mongodb';

let mongoClient: MongoClient;

export const getMongoClient = () => {
    const mongoUrl =
        process.env.MONGO_CONNECTION_STRING ??
        'mongodb://localhost:27017/citysats';

    if (!mongoClient) {
        mongoClient = new MongoClient(mongoUrl, { ignoreUndefined: true });
    }

    return mongoClient;
};

export const getProfileCollection = async () => {
    const client = getMongoClient();
    const db = client.db('citysats');
    // await db.collection('profile').createIndex('username', { unique: true })
    return db.collection('profile');
};
