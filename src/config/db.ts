import { Db, MongoClient } from "mongodb";

let db: Db;
let client: MongoClient;
const dbName = "Wallet";

export const connectMongoDB = async(): Promise<void> => {
    try {
        const url =`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.5scmzzh.mongodb.net/?appName=Cluster0`
        client = new MongoClient(url);
        await client.connect();
        db = client.db(dbName);
        console.log('conectado a la base de datos'+ dbName);

    } catch (error) {
        console.log('No se ha podido conectar a la BBDD');
    }
}

export const getDb = (): Db => db;